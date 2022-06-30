import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import ('./checkout-item.styles.scss');

const CheckoutItem = ({item}) => {
    const {addItemToCart, decreaseItemQuantity, removeItemFromCart} = useContext(CartContext);

    const decreaseHandler = () => decreaseItemQuantity(item);
    const increaseHandler = () => addItemToCart(item);
    const removeHandler = () => removeItemFromCart(item);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={item.imageUrl} alt={`${item.name}`} />
            </div>

            <span className="name">{item.name}</span>

            <span className="quantity">
                <span className="arrow" onClick={decreaseHandler}>&#10094;</span>
                <span className="value">{item.quantity}</span>
                <span className="arrow" onClick={increaseHandler}>&#10095;</span>
            </span>

            <span className="price">${item.price}</span>
            <div className="remove-button" onClick={removeHandler}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;
