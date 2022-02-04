import { useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'


const MealItemForm = (props) => {
    const amontInputRef = useRef();
    const[amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredAmont = amontInputRef.current.value;
        const enteredAmontNumber = +enteredAmont;
        if(enteredAmont.trim().length === 0 || enteredAmontNumber < 1 || enteredAmontNumber > 5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmontNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref = {amontInputRef}
                label = "Amount" input={{
                    id: 'amount',
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'

                }}
            />
            <button>+ Add </button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
}

export default MealItemForm
