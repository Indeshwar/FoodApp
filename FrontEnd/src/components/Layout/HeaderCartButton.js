import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
    const[btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const numOfCartItems = items.reduce((carNumber, item)=>{
        
        return carNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length === 0){
            return
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        }, 300)

        return()=>{
            clearTimeout(timer)
        };

    }, [items]);
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span>Your Cart</span>
            <span className= {classes.badge}>{numOfCartItems}</span>
        </button>
    )
}  

export default HeaderCartButton
