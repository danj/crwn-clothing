import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import ('./checkout-item.styles.scss');

const CheckoutItem = ({item}) => {
    const {addItemToCart, decreaseItemQuantity, removeItemFromCart} = useContext(CartContext);

    const decrease = () => decreaseItemQuantity(item);
    const increase = () => addItemToCart(item);
    const remove = () => removeItemFromCart(item);

    return (
        <div className="checkout-item-container">
            <img src={item.imageUrl} alt={`${item.name}`} />
            <span className="name">{item.name}</span>
            <span className="decrease" onClick={decrease}>{"<"}</span>
            <span className="quantity">{item.quantity}</span>
            <span className="increase" onClick={increase}>{">"}</span>
            <span className="price">{item.price * item.quantity}</span>
            <span className="remove" onClick={remove}>X</span>
        </div>
    );
}

export default CheckoutItem;
