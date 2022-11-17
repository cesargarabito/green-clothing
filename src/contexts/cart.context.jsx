import { createContext, useEffect, useState } from "react";

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

const deleteCartItem = (cartItems, productToRemove) => cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    


export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    restItemToCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    totalCount: 0
});

export const CartProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const newTotalCount = cartItems.reduce((total, cartItem) => total + (cartItem.quantity*cartItem.price), 0)
        setTotalCount(newTotalCount);
    }, [cartItems])

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const restItemToCart = (productToRest) => {
        setCartItems(restCartItem(cartItems, productToRest));
    }

    const deleteItemFromCart = (productToRemove) => {
        setCartItems(deleteCartItem(cartItems, productToRemove));
    }

    const value = { isOpen, setIsOpen, addItemToCart, cartItems, restItemToCart, deleteItemFromCart, cartCount, totalCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider> 
}