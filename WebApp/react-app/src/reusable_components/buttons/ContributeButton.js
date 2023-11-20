import React, { useState } from 'react';
import '../event-related/EventButton.css'
import {Button, Modal, InputGroup, FormControl} from "react-bootstrap";
import {stripeService} from "../../utils/ServerConnection";


/**
 * This is a functional component that allows the user to contribute to a gift
 */
function ContributeButton(props){

    // states for the modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [contributionInput, setContributionInput] = useState({
        amount: '',
        error: ''
    });

    const isInvalidForm = () => {
        return contributionInput.error !== '';
    };

    // Updates contribution state
    const handleAmountChange = (e) => {
        setContributionInput(prevState => ({...prevState, error: ''}));
        setContributionInput(prevState => ({...prevState, amount: e.target.value}))
    };

    /** Form Validation and Handlers for contributing to a gift
     * @param e Button event
     */
     const handleContribute = (e) => {
        console.log("You clicked me!");
        e.preventDefault();

        //Invalid price (entering letters, more than 2 digits for cents)
        const expression = /^\d+(.\d{1,2})?$/;
        let validAmount = expression.test(contributionInput.amount);

        // Validate form
        if (contributionInput.amount === '') {
            console.log("nothing");
            setContributionInput(prevState => ({...prevState, error: 'Must enter a contribution amount'}))
        } else if (!validAmount) {
            console.log("Invalid");
            setContributionInput(prevState => ({...prevState, error: 'Must enter a valid price'}))
        } else if (parseFloat(contributionInput.amount) > (props.gift.price - props.gift.progress)) {
            console.log("too much");
            setContributionInput(prevState => ({
                ...prevState,
                error: 'Cannot add more funds than needed'
            }))
        } else {
            //Stripe takes price in cents so multiply by 100
            console.log("I got here!");
            const donationAmount = parseInt(parseFloat(contributionInput.amount) * 100);
            stripeService.get({
                giftData: props.gift,
                productData: {
                    name: "Wishwell donation to " + props.gift.name
                },
                unitAmount: donationAmount
            })
                .then(( successURL) => {
                    //Success (even if they cancel)
                    console.log("I got here");
                    window.location = successURL
                })
                .catch( (error) => {
                    //Error with request occurred
                    console.log("ERROR: ", error);
                });
        }
    };


    return (
        <div>
            <Button className="mr-1" value={props.gift.id} onClick={handleShow} id={"CardFooterButton"} size="lg" block>
                Contribute
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><a className={'black-link'} href={`/gifts/${props.gift.id}`}>{props.gift.name}</a></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'modal-body'}>
                        <div className={'modal-gift-thumbnail-container'}>
                            <img className={'modal-gift-thumbnail'} src={props.gift.thumbnail} alt={''}/>
                        </div>
                        <div>
                            <label htmlFor="amount">Contribution Amount</label><br/>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id={'amount'} onChange={handleAmountChange}/>
                            </InputGroup>
                            <div className={isInvalidForm() ? 'form-error-message' : 'hidden'}>{contributionInput.error}</div>
                            <br/>
                            <Button id={"contributeButton"} onClick={handleContribute} block>
                                Contribute
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ContributeButton;