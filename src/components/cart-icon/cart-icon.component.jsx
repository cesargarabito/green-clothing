import './cart-icon.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

const CartIcon = () => {
    const { isOpen, setIsOpen } = useContext(CartContext);

    const toggleIsOpen = () => setIsOpen(!isOpen);
    return (
<div className='cart-icon-container'>
<ShoppingIcon className='shopping-icon' onClick={toggleIsOpen} />
<span className='item-count'>0</span>
</div>
    );
}

export default CartIcon