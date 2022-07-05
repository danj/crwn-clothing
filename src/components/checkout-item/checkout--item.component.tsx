import {useDispatch} from "react-redux";
import {addItemToCart, decreaseItemQuantity, removeItemFromCart} from "../../store/cart/cart.actions";
import {CheckoutItemContainer} from "./checkout-item.styles";
import {Item} from "../../types/types";

type CheckoutItemProps = {
    item: Item;
}

const CheckoutItem = ({item}: CheckoutItemProps) => {
    const dispatch = useDispatch();
    const decreaseHandler = () => dispatch(decreaseItemQuantity(item));
    const increaseHandler = () => dispatch(addItemToCart(item));
    const removeHandler = () => dispatch(removeItemFromCart(item));

    return (
        <CheckoutItemContainer>
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
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;
