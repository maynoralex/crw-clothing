import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils"

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false
}

const CART_ACTION_TYPES ={
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default: 
            throw new Error (`Unhandled type of ${type} in cartReducer.`);
            
    }

}



const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
    
    if(existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

     return [
        ...cartItems,
        { ...productToAdd, quantity: 1 }
    ];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem =>
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

export const CartProvider = ({ children }) => {

    const [ { cartItems, cartCount, cartTotal, isCartOpen }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        //get newCartCount
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        //get newCartTotal
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

        //dispatch new action with payload = {newcartitems, newcartcount, newcarttotal}
        dispatch(
            createAction( CART_ACTION_TYPES.SET_CART_ITEMS, { 
            cartItems: newCartItems, 
            cartCount: newCartCount, 
            cartTotal: newCartTotal 
        }))
        
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    const setIsCartOpen = (bool) => {
        dispatch(createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,  
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemToCart, 
        clearItemFromCart,
        cartTotal
    };

    return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>);
}

