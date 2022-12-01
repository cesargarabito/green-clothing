import { createContext, useEffect, useState, useReducer } from "react";

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
//for isOpen 
export const OPEN_ACTION_TYPES = {
    SET_OPEN_CART: 'SET_OPEN_CART'
} 

const openReducer = (state, action) => {
    
    const { type, payload } = action;

    switch(type) {
        case OPEN_ACTION_TYPES.SET_OPEN_CART:
        return {
            ...state,
            isOpen: payload,
        };
        default:
            throw new Error(`Unhandled type ${type} in openReducer`);
    }

};

const INITIAL_STATE = {
    isOpen: false,
};
//for cartitems
export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS'
} 

const cartItemsReducer = (state, action) => {
    console.log('dispatch');
    console.log(action);
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
        return {
            ...state,
            cartItems: payload,
        };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }

};
const INITIAL_STATE_CART_ITEMS = {
    cartItems: [],
};
//for cartCount


const cartItemsCountReducer = (state, action) => {
    
    const { type, payload } = action;

    switch(type) {
        case 'SET_CART_COUNT':
        return {
            ...state,
            cartCount: payload,
        };
        default:
            throw new Error(`Unhandled type ${type} in cartCountReducer`);
    }

};

const INITIAL_STATE_CART_ITEMS_COUNT = {
    cartCount: 0,
};
//for totalCount


const totalCountReducer = (state, action) => {
    console.log('dispatch');
    console.log(action);
    const { type, payload } = action;

    switch(type) {
        case 'SET_CART_TOTAL':
        return {
            ...state,
            totalCount: payload,
        };
        default:
            throw new Error(`Unhandled type ${type} in totalCountReducer`);
    }

};

const INITIAL_STATE_CART_TOTAL_COUNT = {
    totalCount: 0,
};

export const CartProvider = ({ children }) => {
    const [ {isOpen}, dispatch] = useReducer(openReducer, INITIAL_STATE);
    
    
    const setIsOpen = (open) => {
        dispatch({ type: OPEN_ACTION_TYPES.SET_OPEN_CART, payload: open});
    };
    
    
    const [ {cartItems}, dispatched] = useReducer(cartItemsReducer, INITIAL_STATE_CART_ITEMS);
    console.log(cartItems);
    
    const setCartItems = (open) => {
        dispatched({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: open});
    };
    
    const [ {cartCount}, dispatche] = useReducer(cartItemsCountReducer, INITIAL_STATE_CART_ITEMS_COUNT);
    console.log(cartCount);
    
    const setCartCount = (cartcount) => {
        dispatche({ type: 'SET_CART_COUNT', payload: cartcount});
    };
    // const [totalCount, setTotalCount] = useState(0);
    const [ {totalCount}, dispatchede] = useReducer(totalCountReducer, INITIAL_STATE_CART_TOTAL_COUNT);
    console.log(totalCount);
    
    const setTotalCount = (totalcount) => {
        dispatchede({ type: 'SET_CART_TOTAL', payload: totalcount});
    };
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