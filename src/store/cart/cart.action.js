import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const restCartItem = (cartItems, productToRest) => {
    const existedCartItem = cartItems.find((cartItem) => cartItem.id === productToRest.id);

if (existedCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== productToRest.id);
}

return cartItems.map((cartItem) => 
cartItem.id === productToRest.id ? {...cartItem, quantity: cartItem.quantity - 1} 
: cartItem
);
}

const addCartItem = (cartItems, productToAdd) => {
const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

if(existingCartItem){
    return cartItems.map((cartItem) => 
    cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} 
    : cartItem
    );
}
return [...cartItems, {...productToAdd, quantity: 1}];
}

const deleteCartItem = (cartItems, productToRemove) => 
cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_CART_OPEN, boolean);

    export const addItemToCart = (cartItems, productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }
    export const restItemToCart = (cartItems, productToRest) => {
        const newCartItems = restCartItem(cartItems, productToRest);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }

    export const deleteItemFromCart = (cartItems, productToRemove) => {
        const newCartItems = deleteCartItem(cartItems, productToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }
