import { useContext } from "react";
import Input from "./UI/Input";
import useFetch from '../hooks/useFetch.js';
import Button from "./UI/Button.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Modal from "./UI/Modal.jsx";
import ModalContext from "../util/ModalContext.jsx";
import CartContext from "../util/CartContext.jsx";

export default function Checkout({cart, onClose, cartEmpty}) {
    const {enteredValue: fullNameValue, isError: nameHasError, handleChange: handleNameChange, handleBlur: handleNameBlur} = useFetch('');
    const {enteredValue: emailValue, isError: emailHasError, handleChange: handleEmailChange, handleBlur: handleEmailBlur} = useFetch('');
    const {enteredValue: streetValue, isError: streetHasError, handleChange: handleStreetChange, handleBlur: handleStreetBlur} = useFetch('');
    const {enteredValue: postalcodeValue, isError: postalcodeHasError, handleChange: handlePostalcodeChange, handleBlur: handlePostalcodeBlur} = useFetch('');
    const {enteredValue: cityValue, isError: cityHasError, handleChange: handleCityChange, handleBlur: handleCityBlur} = useFetch('');
    const  { handlePostData: sendData } = useFetch('');
    
    // const [enteredValue, setEnteredValue] = useState({
    //     fullName: '',
    //     email: '',
    //     street: '',
    //     postalCode: '',
    //     city: ''
    // });

    // const [isEdit, setIsEdit] = useState({
    //     fullName: false,
    //     email: false,
    //     street: false,
    //     postalCode: false,
    //     city: false
    // });
    
    // let fullNameError = isEdit.fullName && enteredValue.fullName === '';
    // let emailError = isEdit.email && enteredValue.email === '';
    // let streetError = isEdit.street && enteredValue.street === '';
    // let postalCodeError = isEdit.postalCode && enteredValue.postalCode === '';
    // let cityError = isEdit.city && enteredValue.city === '';

    // function handleChange(identifier, value) {
    //     setEnteredValue(prevState => {
    //         return {
    //             ...prevState,
    //             [identifier]: value
    //         }
    //     })
    // }

    // function handleBlur(identifier, value) {
    //     setIsEdit(prevState => {
    //         return {
    //             ...prevState,
    //             [identifier]: true
    //         }
    //     })
    // }

    function handleFormAction(event) {
        event.preventDefault();
        
        if(nameHasError || emailHasError || postalcodeHasError || streetHasError || cityHasError) {
            return;
        }
        const req = {
            customer: {
                email: emailValue,
                name: fullNameValue,
                'postal-code': postalcodeValue,
                street: streetValue,
                city: cityValue,
            },
            items: cart
        }
        sendData(req).then((result) => {
            modalCtx.onHideCheckout;
            cartCtx.items = []
            alert(result.statusText);
        });
        // const sendData  = async () =>  {
        //     await fetch('http://localhost:3000/orders', {
        //         body: JSON.stringify({order: req}),
        //         method: 'POST',
        //         headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //         }
        //     }).then(data => {
        //         return data.json();
        //     }).then(val => {
        //         setEnteredValue({
        //             fullName: '',
        //             email: '',
        //             street: '',
        //             postalCode: '',
        //             city: ''
        //         })
        //         setIsEdit({
        //             fullName: false,
        //             email: false,
        //             street: false,
        //             postalCode: false,
        //             city: false
        //         })
        //         onClose('close');
        //         cartEmpty([])
        //         alert(val.message)
        //     }).catch(error => {
        //         onError(error)
        //     })
        // } 
        // sendData();
    }

    const modalCtx = useContext(ModalContext);
    const cartCtx = useContext(CartContext);
    const totalValue = cartCtx.items.reduce((acc, current) => {return acc + (+current.price)}, 0).toFixed(2)
    return (
        <Modal open={modalCtx.value === 'checkout'} onClose={modalCtx.value === 'checkout' ? modalCtx.onHideCheckout : null}>
            <form onSubmit={handleFormAction}>
                <h2>Chekout</h2>
                <p>Total amount {currencyFormatter.format(totalValue)}</p>
                <Input type="text" value={fullNameValue} label="Full Name" onChange={handleNameChange} error={nameHasError && 'Pleaze enter a full name'} onBlur={handleNameBlur} />
                <Input type="text" value={emailValue} label="Email Address" onChange={handleEmailChange} error={emailHasError && 'Pleaze enter a eamil && correct email'} onBlur={handleEmailBlur}/>
                <Input type="text" value={streetValue} label="Street" onChange={handleStreetChange} error={streetHasError && 'Pleaze enter a street'} onBlur={handleStreetBlur}/>
                
                <div className="control-row">
                    <Input type="text" value={postalcodeValue} label="Postal code" onChange={handlePostalcodeChange} error={postalcodeHasError && 'Pleaze enter a postal code'} onBlur={handlePostalcodeBlur}/>
                    <Input type="text" value={cityValue} label="City" onChange={handleCityChange} error={cityHasError && 'Pleaze enter a city name'} onBlur={handleCityBlur} />
                </div>
                <Button type="close" isText onClick={modalCtx.onHideCheckout}>Close</Button>
                <Button type="submit">Submit</Button>
            </form>
        </Modal>
    )
}