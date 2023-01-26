import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload, Action } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

const restCartItem = (cartItems: CartItem[], productToRest: CartItem): CartItem[] => {
    const existedCartItem = cartItems.find((cartItem) => cartItem.id === productToRest.id);

if (existedCartItem && existedCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== productToRest.id);
}

return cartItems.map((cartItem) => 
cartItem.id === productToRest.id ? {...cartItem, quantity: cartItem.quantity - 1} 
: cartItem
);
}

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

if(existingCartItem){
    return cartItems.map((cartItem) => 
    cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} 
    : cartItem
    );
}
return [...cartItems, {...productToAdd, quantity: 1}];
}

const deleteCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => 
cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.SET_CART_OPEN, boolean));

    export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

    export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        return setCartItems(newCartItems);
    }
    export const restItemToCart = (cartItems: CartItem[], productToRest: CartItem) => {
        const newCartItems = restCartItem(cartItems, productToRest);
        return setCartItems(newCartItems);
    }

    export const deleteItemFromCart = (cartItems: CartItem[], productToRemove:CartItem) => {
        const newCartItems = deleteCartItem(cartItems, productToRemove);
        return setCartItems(newCartItems);
    }
