import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import './product-card.styles.scss'
import { FC } from 'react';
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardProps = {
    product: CategoryItem;
  };

const ProductCard: FC<ProductCardProps> = ({ product }) => {
const dispatch = useDispatch();
const cartItems = useSelector(selectCartItems);
  
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    const { name, price, imageUrl } = product;
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >Add to cart</Button>
        </div>
    )
}

export default ProductCard