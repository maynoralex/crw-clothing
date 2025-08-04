import { createAction, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils"
import { CategoryItem } from "../category/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";


const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) : CartItem[]  => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) : CartItem[] => {
    const existingCartItem  = cartItems.find(item => item.id === cartItemToRemove.id);

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem =>
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
}

const clearCartItem = (cartItems: CartItem[], cartItemToRemove : CartItem) : CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartItems = withMatcher((cartItems: CartItem[]) : SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
})

export const setIsCartOpen = withMatcher((bool :boolean) : SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
 

export const addItemToCart = (cartItems:CartItem[], productToAdd:CartItem) : SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove : CartItem) : SetCartItems => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) : SetCartItems => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}