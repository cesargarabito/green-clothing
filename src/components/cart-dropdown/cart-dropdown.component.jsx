import './cart-dropdown.styles.jsx'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const CartDropdown = () => {
const cartItems = useSelector(selectCartItems);



    return (
<CartDropdownContainer>
    <CartItems>
    {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
    </CartItems>
<Link to='/checkout'><Button >Go to check out</Button></Link>
    

</CartDropdownContainer>
    );
}

export default CartDropdown