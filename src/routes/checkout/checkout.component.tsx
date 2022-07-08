import CheckoutItem from "../../components/checkout-item/checkout--item.component";
import {useSelector} from "react-redux";
import {cartItemsSelector, cartTotalSelector} from "../../store/cart/cart.selectors";
import {CheckoutContainer} from "./checkout.styles";

const Checkout = () => {
    const items = useSelector(cartItemsSelector);
    const total = useSelector(cartTotalSelector);

    return (
        <CheckoutContainer>
            <div className="checkout-header">
                <div className="header-block"><span>Product</span></div>
                <div className="header-block"><span>Description</span></div>
                <div className="header-block"><span>Quantity</span></div>
                <div className="header-block"><span>Price</span></div>
                <div className="header-block"><span>Remove</span></div>
            </div>
            {items.map((item) =>
                <CheckoutItem key={item.id} item={item} />
            )}
            <span className="total">Total: ${total}</span>
        </CheckoutContainer>
    );
}

export default Checkout;
