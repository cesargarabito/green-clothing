// import Button from '../button/button.component';
import './checkout-item.styles.scss'
// import { useContext } from 'react';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, restItemToCart, deleteItemFromCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const decreasehandler = () => dispatch(restItemToCart(cartItems, cartItem));
    const increaseHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeHandler = () => dispatch(deleteItemFromCart(cartItems, cartItem));

    // const { addItemToCart, restItemToCart, deleteItemFromCart} = useContext(CartContext);
    const { name, imageUrl, price, quantity } = cartItem;
    
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />

            </div>
<span className='name'>{name}</span>
{/* <span >-</span> */}
<span className='quantity'>
    <div className='arrow' onClick={decreasehandler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={increaseHandler}>&#10095;</div>
        </span>
{/* <span }>+</span> */}
<span className='price'>${price}</span>
<div className='remove-button' onClick={removeHandler}>&#10005;</div>

        </div>
    )
}

export default CheckoutItem