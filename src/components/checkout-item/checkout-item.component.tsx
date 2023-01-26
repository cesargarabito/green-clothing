
import './checkout-item.styles.scss'

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, restItemToCart, deleteItemFromCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FC } from 'react';
import { CartItem } from '../../store/cart/cart.types';


type CheckoutItemProps = {
    cartItem: CartItem;
  };

const CheckoutItem: FC<CheckoutItemProps> = ({cartItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const decreasehandler = () => dispatch(restItemToCart(cartItems, cartItem));
    const increaseHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeHandler = () => dispatch(deleteItemFromCart(cartItems, cartItem));

   
    const { name, imageUrl, price, quantity } = cartItem;
    
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />

            </div>
<span className='name'>{name}</span>

<span className='quantity'>
    <div className='arrow' onClick={decreasehandler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={increaseHandler}>&#10095;</div>
        </span>

<span className='price'>${price}</span>
<div className='remove-button' onClick={removeHandler}>&#10005;</div>

        </div>
    )
}

export default CheckoutItem