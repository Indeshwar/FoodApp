import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action)=>{
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item=> item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            
            //copy old items 
            updatedItems = [...state.items];
            //update new item
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        
        return {items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
            item=> item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;

        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item=> item.id != action.id);

        }else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }


    }
    
    if(action.type === 'CLEAR'){
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider = (props)=>{
    const [cartState, dispatcherCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item)=>{
        dispatcherCartAction({type: 'ADD', item: item})
    };

    const removeItemToCartHandler = (id)=>{
        dispatcherCartAction({type: 'REMOVE', id: id});
    };

    const clearCartHandler = ()=>{
        dispatcherCartAction({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
        
}

export default CartProvider;