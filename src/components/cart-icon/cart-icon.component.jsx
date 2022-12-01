import { ShoppingIcon, ItemCount, CartIconContainer } from './cart-icon.styles';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { useDispatch } from 'react-redux';


const CartIcon = () => {
    const isOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();
   

    const toggleIsOpen = () => dispatch(setIsCartOpen(!isOpen));
    return (
<CartIconContainer>
<ShoppingIcon onClick={toggleIsOpen} />
<ItemCount>{cartCount}</ItemCount>
</CartIconContainer>
    );
}

export default CartIcon