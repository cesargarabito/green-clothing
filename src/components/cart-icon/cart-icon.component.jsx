import { ShoppingIcon, ItemCount, CartIconContainer } from './cart-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CartIcon = () => {
    const { isOpen, setIsOpen, cartCount } = useContext(CartContext);

    const toggleIsOpen = () => setIsOpen(!isOpen);
    return (
<CartIconContainer>
<ShoppingIcon onClick={toggleIsOpen} />
<ItemCount>{cartCount}</ItemCount>
</CartIconContainer>
    );
}

export default CartIcon