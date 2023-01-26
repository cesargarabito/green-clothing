
import { selectCartItems, selectCartTotalCount } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import  PaymentForm  from '../../components/payment-form/payment-form.component'
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";




const Checkout = () => {

const cartItems = useSelector(selectCartItems);
const totalCount = useSelector(selectCartTotalCount);



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
<PaymentForm />
        </CheckoutContainer>
        
    );
}

export default Checkout