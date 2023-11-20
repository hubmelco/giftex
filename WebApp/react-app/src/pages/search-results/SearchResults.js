import {useUser} from "../../utils/UserContext";
import React, {useState, useEffect} from 'react';
import "../../App.css";
import {useParams} from 'react-router-dom';
import {userRelationshipsService, usersService} from '../../utils/ServerConnection';
import UserCard from "./components/UserCard";
import "./SearchResults.css";
import {faSortAlphaDown, faSortAlphaUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * Page that displays search results
 */
function SearchResults() {
    // gets the search query from URL
    const search = useParams();
    // currently logged in user
    const {user} = useUser();
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // stores current friends list of the user
    const [outgoingList, setOutgoingList] = useState();
    const [incomingList, setIncomingList] = useState();

    // Currently using a useEffect to load in search results
    useEffect(() => {
        setLoading(true);
        const searchInput = search.id.trim();
        userRelationshipsService.find({
            // query: {
            //     $select: ['otherUserId', 'type'],
            //     userId: {$eq: user.id}
            // }
            query: {
                $select: ['userId', 'otherUserId', 'type'],
                $or: [
                    {userId: user.id},
                    {otherUserId: user.id}
                ]
            }
        }).then((friends) => {
            //if sender (userId) === user.id is us then it is outgoing
            // if receiver is us then it is incoming (otherUserId === user.id)
            console.log("FRIENDS", friends);
            let outgoing = {};
            let incoming = {};
            friends.data.forEach((entry) => {
                if (entry.userId === user.id) {
                    outgoing[entry.otherUserId] = entry.type;
                } else if (entry.otherUserId === user.id) {
                    incoming[entry.userId] = entry.type;
                }
            });
            setOutgoingList(outgoing);
            setIncomingList(incoming);
        }).catch((err) => {
            console.log("Error accessing friends list", err);
        });


        usersService.find({
            query: {
                $select: ['name', 'id'],
                $sort: {
                    name: 1
                },
                id: {$ne: user.id},
                name: {$like: '%' + searchInput + '%'}
            }
        }).then((users) => {
            setLoading(false);
            if (users.data.length === 0) {
                setResults([]);
            } else {
                setResults(users.data);
            }
        }).catch((err) => {
            console.log("Error loading results", err);
        });
    }, [search.id, user.id])

    /*------------------------------------------------------SORTING-------------------------------------------------------*/

    // this works functionally but will not make results re render
    const [sort, setSort] = useState('ASC');
    // A-Z sort icon, changes the icon displayed based on whether its in alphabetical or reverse alphabetical order
    const [searchIcon, setIcon] = useState(faSortAlphaUp);

    /**
     * checks if the sorting request is ascending or descending order, and switches the icon displayed
     */
    const requestSort = () => {
        if (sort === "ASC") {
            setSort("DESC");
            setIcon(faSortAlphaUp)
        } else {
            setSort("ASC");
            setIcon(faSortAlphaDown);
        }
    }

    // sorts results list alphabetically
    useEffect(() => {
        results.sort((a, b) => {
            if (a.name < b.name) {
                return sort === 'ASC' ? -1 : 1;
            }
            if (a.name > b.name) {
                return sort === 'ASC' ? 1 : -1;
            }
            return 0;
        });
    }, [results, sort]);

    /*----------------------------------------------------HTML------------------------------------------------------------*/

    //TODO: current loading image may be copyrighted? Create our own wishwell themed loading image and/or
    // find and ensure that a new loading image is not copyrighted
    if (isLoading) {
        return (
            <div>
                <div className={"d-flex justify-content-center pt-5"}>
                    <div className={"flex-column"}>
                        <img alt={'Loading'}
                             src="https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif"/>
                        <h2 className={"text-center"}>Loading...</h2>
                    </div>
                </div>
            </div>
        );
    }

    //no search results found
    if (results.length === 0) {
        return (
            <div>
                <div className="d-flex p-2 pb-0 mt-3 justify-content-center flex-column" id="results">
                    <h3 id="searchResultsHeader">No results were found for {search.id}.</h3>
                    <h4 className={'align-self-center'}>Please try another search</h4>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {/* GENERAL SEARCH LIST */}
                <div className="d-flex p-2 justify-content-around pb-0 mt-3" id="results">
                    <div className="align-self-end">
                        <div id="numberOfResults">
                            {results.length} result(s)
                        </div>
                    </div>
                    <div>
                        <h2 id="searchResultsHeader">Search Results for: {search.id}</h2>
                    </div>
                    <div className="align-self-end p-2">
                        <button
                            onClick={requestSort}
                        ><FontAwesomeIcon icon={searchIcon}/></button>
                    </div>
                </div>

                {/* LOAD USERS FROM SEARCH */}
                <div className={"container justify-content-center align-items-center"}>
                    <div className="col justify-content-center justify-items-center">
                        {results.map((user) => {
                            return (<UserCard userID={user.id} userRelations={{'outgoing': outgoingList, 'incoming': incomingList}} key={user.id}/>)
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResults;