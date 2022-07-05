import {Item} from "../../types/types";
import {CartItemContainer} from "./cart-item.styles";

type CartItemProps = {
    item: Item;
}

const CartItem = ({item}: CartItemProps) => {
    const {name, imageUrl, price, quantity } = item;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">{quantity} x {price}</span>
            </div>
        </CartItemContainer>
    )
}

export default CartItem;
