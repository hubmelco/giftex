import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useUser} from "../../utils/UserContext";
import {giftsService, usersService} from "../../utils/ServerConnection";
import {Button, Card, Col, Form, Image, ProgressBar, Row} from "react-bootstrap";
import Comment from "./components/Comment";
import EditGift from "../../reusable_components/gift-related/EditGift";
import ContributeButton from '../../reusable_components/buttons/ContributeButton';
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


/**
 * Renders the large gift page
 * Comment functionality has been commented out but not removed in hopes that it will be revisited and implemented
 * in the future.
 */
function Gift() {

    let {id} = useParams();

    const {user} = useUser();

    /**
     * States and consts
     */
    const [giftInfo, setGiftInfo] = useState({});
    const [creatorInfo, setCreatorInfo] = useState({});
    // TODO add setGiftComments to this state whenever you guys set up gift comments in the database -previous group
    const [giftComments] = useState([]);
    const [show, setShow] = useState(false);
    const [commentInput, setCommentInput] = useState({
        comment: '',
        error: ''
    });

    // used for editing modal
    const handleShow = () => setShow(true);

    useEffect(() => {
        giftsService.get(id)
            .then((giftData) => {
                setGiftInfo(giftData);
                usersService.get(giftData.userId)
                    .then((userData) => {
                        setCreatorInfo(userData)
                    })
            })
            .catch((err) => {
                console.log(err);
            })
        // TODO Add something in the database to store comments on a gift

        //TODO: Decide if you guys want to store wallet funds

    }, [id, giftInfo.userId]);


    const isInvalidComment = () => {
        return commentInput.error !== '';
    };


    /**
     * Update changes to comment input
     * @param e
     */
    const handleCommentChange = (e) => {
        setCommentInput({
            comment: e.target.value,
            error: ''
        });
    };

    /**
     * Add comment handler
     * @param e
     */
    const handleAddComment = (e) => {
        e.preventDefault();
        // TODO create a gift comment service
    };

    /**
     * This method determines if the user is the owner of the gift
     * and displays the "Edit Gift" button accordingly
     */
    function renderGift() {
        // set editable view if the viewing user is the creator
        if (user.id === creatorInfo.id) {
            return (
                <div>
                    <Button onClick={handleShow} size="lg" block>
                        Update Gift
                    </Button>
                    <EditGift gift={giftInfo} open={show} setOpen={setShow} setGift={setGiftInfo}> </EditGift>
                </div>
            )
        }
    }

    return (
        <div>
            <div className='d-flex mt-2'>
                <Col>
                    <Row className='m-4'>
                        <Col xs={5}>
                            <div className={'grid-gift-image'}>
                                <div className={'giftLG-thumbnail-container'}>
                                    <img className={'giftLG-thumbnail'} src={giftInfo.thumbnail} alt={'pic'}/>
                                </div>
                                <div className={'gift-alt-images-container'}>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='mt-5'>
                                <h2 className={'gift-title'}> {giftInfo.name}</h2>
                                <span className={'gift-lg-funds'}>${giftInfo.progress}</span><br/>
                                <span className={'gift-lg-price'}>of ${giftInfo.price} funded</span>
                                <ProgressBar animated now={(giftInfo.progress / giftInfo.price) * 100}/><br/>
                                <div className='d-flex flex-column justify-content-center '>
                                    <ContributeButton gift={giftInfo}/>
                                    <br/>
                                    {renderGift()}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='justify-content-center m-4'>
                        <Col>
                            <Card>
                                <Card.Header>
                                    Details
                                </Card.Header>
                                <Card.Body>
                                    <div className={'user-card'}>
                                        <Link to={`/account/${creatorInfo.id}`}>
                                            <Image src={creatorInfo.profile_pic} style={{"width": "100px"}}
                                                   rounded/>
                                        </Link>
                                    </div>
                                    <div>
                                        {giftInfo.description}
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <FontAwesomeIcon icon={faClockRotateLeft} className={'pr-1'} title={"Last Updated"}/>
                                            {new Date(giftInfo.updatedAt).toLocaleDateString()}
                                        </div>
                                        <div>
                                            Due By: {new Date(giftInfo.deadline).toLocaleDateString('en-US', {timeZone: 'UTC'})}
                                        </div>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='m-4'>
                        <Col>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Header>
                                    Comments
                                </Card.Header>
                                <Card.Body>
                                    <div className={'create-comment-container'}>
                                        <div className={'comment-and-icon'}>
                                            <div className={'comment-icon-container'}>
                                                <Image className={'comment-icon'} src={creatorInfo.profile_pic}
                                                       rounded/>
                                            </div>
                                            <div className={'comment-text-container'}>
                                                <Form.Group className={'comment-textarea'}>
                                                    <Form.Control id={'comment-text'}
                                                                  className={isInvalidComment() ? 'is-invalid' : ''}
                                                                  onChange={(e) => handleCommentChange(e)}
                                                                  placeholder={'Add a comment...'} as="textarea"
                                                                  rows={3}/>
                                                </Form.Group>
                                                <div id={'comment-error'}
                                                     className={isInvalidComment() ? 'form-error-message' : 'hidden'}>{commentInput.error}</div>
                                            </div>
                                        </div>
                                        <div className={'create-comment-button'}>
                                            <Button size={'sm'} onClick={(e) => handleAddComment(e)}>Add
                                                Comment</Button>
                                        </div>
                                    </div>
                                    <div>
                                        {giftComments.map(comment => {
                                            return <Comment data={comment}/>
                                        })}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </div>
        </div>
    )
}

export default Gift;
