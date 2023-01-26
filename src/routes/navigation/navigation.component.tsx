import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'


import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { useDispatch } from "react-redux";
import { signOutStart } from "../../store/user/user.action";



const Navigation = () => {
const currentUser = useSelector(selectCurrentUser)
const dispatch = useDispatch();
const isOpen = useSelector(selectIsCartOpen);
const signOutUser = () => dispatch(signOutStart());






    return (
        <Fragment>
        
            <NavigationContainer>
            
                <LogoContainer to='/'>
                
                <CrwnLogo className="logo" />
                
                </LogoContainer>
                
                <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                <NavLink to='/auth'>
                    {currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>
                                Sign Out
                            </NavLink>
                            ) : (
                            <NavLink to='/auth'>Sign In</NavLink>)
                    }
                </NavLink>
                <CartIcon />
                
                </NavLinks>
                
                {isOpen && <CartDropdown /> }
            </NavigationContainer>
            <Outlet />
        
        </Fragment>
    );
}

export default Navigation