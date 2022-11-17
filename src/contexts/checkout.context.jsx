import { createContext, useState } from "react";

const addCheckoutItem = (checkoutItems, productToAddToCheckout) => {
    const existingCheckoutItem = checkoutItems.find((checkoutItem) => checkoutItem.id === productToAddToCheckout.id);

    if (existingCheckoutItem){
        return checkoutItems.map((checkoutItem) => checkoutItem.id === productToAddToCheckout.id ?
        {...checkoutItem, quantity: checkoutItem.quantity + 1}
        : checkoutItem
        );
    }

    return [...checkoutItems, { ...productToAddToCheckout, quantity: 1}];
}

export const CheckoutContext = createContext({

checkoutItems: [],
addItemToCheckout: () => {}
});

export const CheckoutProvider = ({ children }) => {
    const [checkoutItems, setCheckoutItems] = useState([]);

    const addItemToCheckout = (productToAddToCheckout) => {

    }
    const value = { addCheckoutItem, checkoutItems };



    return (<CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>);
}