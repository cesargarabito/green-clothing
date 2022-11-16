import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import './navigation.styles.scss'
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
        
            <div className="navigation">
                <Link className="logo-container" to='/'>
                <CrwnLogo className="logo" />
                </Link>
                
                <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                <Link className="nav-link" to='/auth'>
                    {currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>Sign Out</span>
                            ) : (<Link className="nav-link" to='/auth'>Sign In</Link>)
                    }
                </Link>
                <CartIcon />
                
                </div>
                
                {isOpen && <CartDropdown /> }
            </div>
            <Outlet />
        
        </Fragment>
    );
}

export default Navigation