import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout--item.component";

const Checkout = () => {
    const { items } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <h2>This is the checkout page</h2>
            {items.map((item) => (
                <CheckoutItem key={item.id} item={item} />
            ))}
            <h3>Total: {items.reduce((s, item) => (s + item.price * item.quantity), 0)}</h3>
        </div>
    );
}

export default Checkout;
