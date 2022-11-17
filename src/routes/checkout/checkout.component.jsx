import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react"
import { CheckoutContext } from "../../contexts/checkout.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import CartItem from "../../components/cart-item/cart-item.component";
import './checkout.styles.scss'

const Checkout = () => {
const {cartItems, totalCount} = useContext(CartContext);
// const { checkoutItems } = useContext(CheckoutContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>

                <div className="header-block">
                    <span>Description</span>
                </div>

                <div className="header-block">
                    <span>Quantity</span>
                </div>

                <div className="header-block">
                    <span>Price</span>
                </div>

                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
        
            {cartItems.map((cartItem) => {
                const { id } = cartItem;
            return (
                <CheckoutItem key={id} cartItem={cartItem} />
    )
})}
<span className="total">Total: ${totalCount}</span>
        </div>
        
    );
}

export default Checkout