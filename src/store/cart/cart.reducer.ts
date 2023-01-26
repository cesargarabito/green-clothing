import { CartItem, CART_ACTION_TYPES } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";
import { AnyAction}  from 'redux';

export type CartState = { 
     readonly cartItems: CartItem[];
     readonly isOpen: boolean;
    // readonly error: Error | null;
}

export const CART_INITIAL_STATE: CartState = {
    isOpen: false,
    cartItems: [],
    };
    
    export const cartReducer = ( 
        state = CART_INITIAL_STATE, 
        action: AnyAction
        ): CartState => {
        if(setCartItems.match(action)) {
            return { 
                            ...state, 
                            cartItems: action.payload, 
                        };
        }
        if(setIsCartOpen.match(action)) {
            return { 
                            ...state, 
                             isOpen: action.payload, 
                         };
        }
    
       
                    return state;
        
    };