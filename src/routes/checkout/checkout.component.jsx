import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react"
import { CheckoutContext } from "../../contexts/checkout.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import CartItem from "../../components/cart-item/cart-item.component";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";

const Checkout = () => {
const {cartItems, totalCount} = useContext(CartContext);
// const { checkoutItems } = useContext(CheckoutContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
        
            {cartItems.map((cartItem) => {
                const { id } = cartItem;
            return (
                <CheckoutItem key={id} cartItem={cartItem} />
    )
})}
<Total as='span'>Total: ${totalCount}</Total>
        </CheckoutContainer>
        
    );
}

export default Checkout