import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.jsx'
import { ReactComponent as CrwnLogo } from '../../assets/green.svg'
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {

const { currentUser } = useContext(UserContext);
const { isOpen } = useContext(CartContext);


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
                            <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                            ) : (<NavLink to='/auth'>Sign In</NavLink>)
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