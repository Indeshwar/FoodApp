import {useRef, useState} from 'react';
import classes from './Checkout.module.css'

const Checkout = (props) => {
    const[formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });
    
    const items = props.onCartItem;

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = (value)=>{
        if(value.trim().length === 0){
            return false;
        }else {
            return true;
        }
    }

    const isFiveChars = (value)=>{
        if(value.trim().length === 5){
            return true;
        }else {
            return false;
        }
    }

    const confirmHandler=(event)=>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameValid = isEmpty(enteredName);
        const enteredStreetValid = isEmpty(enteredStreet);
        const enteredCityValid = isEmpty(enteredCity);
        const enteredPostalValid = isFiveChars(enteredPostal);
  

        setFormInputsValidity(
            {
                name: enteredNameValid,
                street: enteredStreetValid,
                city: enteredCityValid,
                postalCode: enteredPostalValid
                
            }
        );

        const isFormValid = enteredNameValid && enteredPostalValid && enteredStreetValid && enteredCityValid;

        if(!isFormValid){
            return;
        }

        //submit the form
        props.onSubmitOrder({
            customerName: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal,
            orderItems: items
        });

    
    }

    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className= {`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id = 'name' ref = {nameInputRef}/>
            {!formInputsValidity.name && <p>Please enter a valid name</p>}
        </div>

        <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id = 'street' ref={streetInputRef}/>
            {!formInputsValidity.street && <p>Please enter a valid street</p>}
        </div>

        <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id = 'postal' ref ={postalInputRef}/>
            {!formInputsValidity.postalCode && <p>Please enter 5 digit postal code</p>}
        </div>

        <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id = 'city' ref={cityInputRef}/>
            {!formInputsValidity.city && <p>Please enter a valid city</p>}
        </div>

        <div className={classes.actions}>
            <button className={classes.button}>Confirm</button>
            <button className={classes.button} type='button' onClick={props.onCancel}>Cancel</button>
        </div>
       
  </form>;
};

export default Checkout;
