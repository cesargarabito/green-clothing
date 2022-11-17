import Button from '../button/button.component';
import './checkout-item.styles.scss'
import { useContext } from 'react';
import { CheckoutContext } from '../../contexts/checkout.context';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
    const { addItemToCart, restItemToCart, deleteItemFromCart, totalCount} = useContext(CartContext);
    const { name, imageUrl, price, quantity } = cartItem;
    
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />

            </div>
<span className='name'>{name}</span>
{/* <span >-</span> */}
<span className='quantity'>
    <div className='arrow' onClick={() => restItemToCart(cartItem)}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItemToCart(cartItem)}>&#10095;</div>
        </span>
{/* <span }>+</span> */}
<span className='price'>${price}</span>
<div className='remove-button' onClick={() => deleteItemFromCart(cartItem)}>&#10005;</div>

        </div>
    )
}

export default CheckoutItem