import React, {useState} from 'react';
import {Button, Col, Form, FormControl, InputGroup, Tab, Tabs, Image} from "react-bootstrap";
import {useUser} from "../../utils/UserContext";
import Loading from "../../reusable_components/loading/Loading"
import "./AddGift.css";
import "../gift/Gifts.css";
import {app, giftsService} from '../../utils/ServerConnection'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom";

/**
 * Page to add a gift to a user's profile
 * 
 */
function AddGift() {

    // Timer for the toast notifications
    const sleepTimer = 1000;
    const {user} = useUser();
    const history = useHistory();

    const [addGift, setAddGift] = useState({
        name: '',
        price: 0,
        thumbnail: '',
        description: '',
        link: '',
        deadline: '',
        amazonUrl: '',
        email: '',
        userId: user.id,
    });

    // Will be changed to strings if theres an error
    // TODO setup an error for deadline
    const [errors, setErrors] = useState({
        nameError: null,
        descriptionError: null,
        priceError: null,
        linkError: null,
        thumbnailError: null,
        deadlineError: null
    });

    const handlePriceChange = (e) => {
        setAddGift(prevState => ({...prevState, price: Math.round(e.target.value)}));
        setErrors(prevState => ({...prevState, priceError: ''}));
    };

    const [hasAmazonProductData, setHasAmazonProductData] = useState(false);
    const [isLoading, setLoading] = useState(false);

    // Toast Things
    const addGiftAlert = () => toast("Your gift has been added!");
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


    /**
     * This method checks whether there is an error in the form.
     *
     * @returns {boolean} Whether the input form has an error in it
     */
    const checkHasFormErrors = () => {
        let hasError = false
        const expression = /^(\d+)(\.\d{1,2})?$/;
        const validAmount = expression.test(addGift.price);

        //The following check if the user left an input box empty
        if (addGift.name === '') {
            setErrors(prevState => ({...prevState, nameError: 'Value cannot be empty'}))
            hasError = true
        }
        if (addGift.description === '') {
            setErrors(prevState => ({...prevState, descriptionError: 'Value cannot be empty'}))
            hasError = true
        }
        if (!validAmount) {
            setErrors(prevState => ({...prevState, priceError: 'Must enter a valid price'}))
            hasError = true
        }
        if (addGift.price === 0) {
            setErrors(prevState => ({...prevState, priceError: 'Value cannot be empty'}))
            hasError = true
        }
        if (addGift.link === '') {
            setErrors(prevState => ({...prevState, linkError: 'Value cannot be empty'}))
            hasError = true
        }
        if (addGift.thumbnail === '') {
            setErrors(prevState => ({...prevState, thumbnailError: 'Value cannot be empty'}))
            hasError = true
        }
        return hasError
    }
    /**
     * Event handler for clicking add gift
     *
     * @param e The source of the event-large
     * @returns {Promise<void>} resolves to a gift being added to database or an error printed to console/user
     */
    const handleAddGift = async (e) => {
        e.preventDefault();
        if (!checkHasFormErrors()) {
            try {
                const giftData = await giftsService.create(addGift);
                addGiftAlert();
                sleep(sleepTimer).then(() => {
                    history.push(`/gifts/${giftData.id}`);
                })
            } catch (err) {
                //TODO show user the error
                toast(err.message)
                console.log(err);
            }
        }
    };

    /**
     * *CURRENTLY NOT FUNCTIONAL* Uses Amazon API to get gift information from amazon.
     *
     * @returns {Promise<void>} resolves with setLoading being set to true and setHasAmazonProductData set to true
     */
    const getAmazonProductData = async () => {
        setLoading(true);
        try {
            //TODO for some reason /amazon breaks auth so I have this reAuth in here
            // Break meaning you are signed in (JWT in localStorage), but it doesn't acknowledge it
            //await app.reAuthenticate();
            const productData = await app.service('amazon').get("", {query: {url: addGift.amazonUrl}});
            setAddGift(prevState => ({
                ...prevState,
                name: productData.productTitle,
                thumbnail: productData.image,
                price: productData.price,
                description: productData.productDescription,
                link: addGift.amazonUrl
            }));
            setLoading(false);
            setHasAmazonProductData(true);
        } catch (error) {
            toast(error.message)
            console.log(error);
        }
    };

    /**
     * Form handler to update values entered by user
     * 
     */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddGift(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevState => ({
            ...prevState,
            [name + 'Error']: ''
        }));
    };

    /**
     * Renders amazon product data when hasAmazonProductData is true, i.e., getAmazonData resolves.
     *
     * @returns {JSX.Element} returns the HTML to present amazon info
     */
    const RenderAmazonProductInfo = () => {
        if (hasAmazonProductData) {
            return (
                <div>
                    <Form.Group className={'form-group'}>
                        <Form.Label>Name </Form.Label>
                        <Form.Control className={errors.nameError ? 'is-invalid' : ''}
                                      placeholder="Enter a name for your gift"
                                      value={addGift.name}
                                      onChange={handleChange}
                                      name={'name'}/>
                        <div className={errors.nameError ? 'form-error-message' : 'hidden'}>{errors.nameError}</div>
                    </Form.Group>

                    <Form.Group className={'form-group'}>
                        <Form.Label>Description </Form.Label>
                        <Form.Control className={errors.descriptionError ? 'is-invalid' : ''}
                                      placeholder={'Enter a description for your gift'}
                                      value={addGift.description}
                                      as="textarea" rows={3}
                                      name={'description'}
                                      onChange={handleChange}/>
                        <div
                            className={errors.descriptionError ? 'form-error-message' : 'hidden'}>{errors.descriptionError}</div>
                    </Form.Group>

                    <Form.Group className={'form-group'}>
                        <Form.Label>Price</Form.Label>
                        <InputGroup className={'price-input'}>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl className={errors.priceError ? 'is-invalid' : ''}
                                         onChange={handlePriceChange}
                                         name={'price'}
                                         value={addGift.price}
                                         placeholder={"Enter the price of your gift"}/>
                        </InputGroup>
                        <div className={errors.priceError ? 'form-error-message' : 'hidden'}>{errors.priceError}</div>
                    </Form.Group>

                    <Form.Group className={'form-group'}>
                        <Form.Label>Image</Form.Label>
                        <div className={'amazon-image-container'}>
                            <Image src={addGift.thumbnail} alt={addGift.name} fluid/>
                        </div>
                    </Form.Group>

                    <Form.Group className={'form-group'}>
                        <Form.Label>Receiver</Form.Label>
                        <Form.Control className={errors.emailError ? 'is-invalid' : ''}
                                      placeholder="Enter the email of the user receiving the gift"
                                      name={'email'}
                                      value={addGift.email}
                                      onChange={handleChange}/>
                        <div className={errors.emailError ? 'form-error-message' : 'hidden'}>{errors.emailError}</div>
                    </Form.Group>

                    <Form.Group className={'form-group'}>
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control placeholder="Enter a deadline for your gift"
                                      name={'deadline'}
                                      type={'date'}
                                      onChange={handleChange}/>
                    </Form.Group>

                    <Button onClick={handleAddGift}>Add Gift</Button>
                </div>
            )
        }
        return null
    };

    return (
        <div>
            <div className={'content-container padding-container'}>
                <h1>Add a Gift</h1>
                <Tabs fill className={'tabs'} defaultActiveKey="manual">
                    <Tab eventKey="manual" title="Manual">
                        <div className={'add-gift-form-container grey-background'}>
                            <Form className={'gift-form'}>
                                <Form.Group className={'form-group'}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control className={errors.nameError ? 'is-invalid' : ''}
                                                  placeholder="Enter a name for your gift"
                                                  onChange={handleChange}
                                                  name={'name'}/>
                                    <div
                                        className={errors.nameError ? 'form-error-message' : 'hidden'}>{errors.nameError}</div>
                                </Form.Group>

                                <Form.Group className={'form-group'}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control className={errors.descriptionError ? 'is-invalid' : ''}
                                                  placeholder={'Enter a description for your gift'}
                                                  as="textarea" rows={3}
                                                  name={'description'}
                                                  onChange={handleChange}/>
                                    <div
                                        className={errors.descriptionError ? 'form-error-message' : 'hidden'}>{errors.descriptionError}</div>

                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} className={'form-group'}>
                                        <Form.Label>Price</Form.Label>
                                        <InputGroup className={'price-input'}>
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <FormControl className={errors.priceError ? 'is-invalid' : ''}
                                                         onChange={handlePriceChange}
                                                         name={'price'}
                                                         placeholder={"Enter the price of your gift"}/>
                                        </InputGroup>
                                        <div
                                            className={errors.priceError ? 'form-error-message' : 'hidden'}>{errors.priceError}</div>
                                    </Form.Group>

                                    <Form.Group as={Col} className={'form-group'}>
                                        <Form.Label>Deadline</Form.Label>
                                        <Form.Control placeholder="Enter a deadline for your gift"
                                                      name={'deadline'}
                                                      type={'date'}
                                                      onChange={handleChange}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group className={'form-group'}>
                                    <Form.Label>Url</Form.Label>
                                    <Form.Control className={errors.linkError ? 'is-invalid' : ''}
                                                  placeholder="Enter the Url for your gift"
                                                  name={'link'}
                                                  onChange={handleChange}/>
                                    <div
                                        className={errors.linkError ? 'form-error-message' : 'hidden'}>{errors.linkError}</div>
                                </Form.Group>

                                <Form.Group className={'form-group'}>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control className={errors.thumbnailError ? 'is-invalid' : ''}
                                                  placeholder="Enter the Url to an image of your gift"
                                                  name={'thumbnail'}
                                                  onChange={handleChange}/>
                                    <div
                                        className={errors.thumbnailError ? 'form-error-message' : 'hidden'}>{errors.thumbnailError}</div>
                                </Form.Group>

                                <Button onClick={handleAddGift}>Add Gift</Button>
                            </Form>
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Automatic">
                        <div className={'add-gift-form-container grey-background'}>
                            <Form className={'gift-form'}>
                                <Form.Group className={'form-group'}>
                                    <Form.Label>Amazon Gift Url</Form.Label>
                                    <Form.Control placeholder="Enter an Amazon Url for the gift you want to add"
                                                  onChange={handleChange}
                                                  name={'amazonUrl'}/>
                                </Form.Group>
                                {!hasAmazonProductData && <Button onClick={getAmazonProductData}>Go</Button>}
                                <div className={'d-flex justify-content-center'}>
                                    {isLoading && <Loading/>}
                                </div>
                                <RenderAmazonProductInfo/>
                            </Form>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )

}

export default AddGift;
