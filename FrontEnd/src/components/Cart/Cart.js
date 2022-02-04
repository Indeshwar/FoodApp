import React, {useContext, useState} from 'react'
import CartContext from '../../store/cart-context'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import Checkout from './Checkout'
import httpCommon from '../../service/http-common'
import axios from 'axios'

const Cart = (props) => {
    const[isCheckout, setIsCheckout] = useState(false);
    const[isSubmitting, setIsSubmitting] = useState(false);
    const[didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const items = cartCtx.items;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = (id)=>{
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item)=>{
        cartCtx.addItem(item);
    };

    const orderHandler = ()=>{
        setIsCheckout(true);
    }

    const saveOrder = (order)=>{
        return httpCommon.post('/ordermeal', order);
    }

    const submtiOrderHandler = (userData)=>{
        const order = {customers:userData};
        setIsSubmitting(true);
        saveOrder(order).then(res=>{
            console.log('Successfully submitted!');
        });
        console.log()
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>
                            {items.map(item=><CartItem
                            key = {item.id} 
                            name = {item.name}
                            amount={item.amount}
                            price= {item.price}
                            onRemove = {cartItemRemoveHandler.bind(null, item.id)}
                            onAdd = {cartItemAddHandler.bind(null, item)}/>)}
                        </ul>

    const hastItem = cartCtx.items.length > 0;

    const modalAction = <div className={classes.actions}>
                            <button className={classes.close} onClick={props.onHideCart}>Close</button>
                            {hastItem && <button className={classes.button} onClick={orderHandler}>Order</button>} 
                        </div>

    const cartModalContent = <React.Fragment>
                                {cartItems}
                                <div className={classes.total}>
                                    <span>Total Amount</span>
                                    <span>{totalAmount}</span>
                                </div>
                                {isCheckout && <Checkout onCartItem = {items} onCancel = {props.onHideCart} onSubmitOrder = {submtiOrderHandler}/>}
                                {!isCheckout && modalAction}
                            </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmittModalContent = (<React.Fragment>
                                        <p>Successfully set the order!</p>
                                        <div className={classes.actions}>
                                            <button className={classes.close} onClick={props.onHideCart}>Close</button>
                                        </div>
                                    </React.Fragment>)

    return (
        <Modal onClose = {props.onHideCart}>
             {/* {!hastItem && <p>There is nothing in cart!</p>} */}
             {!isSubmitting && !didSubmit && cartModalContent}
             {isSubmitting && isSubmittingModalContent}
             {!isSubmitting && didSubmit && didSubmittModalContent}
            
        </Modal>
    )
}

export default Cart
