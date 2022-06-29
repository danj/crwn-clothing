import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import {CartContext} from "../../contexts/cart.context";
import {useContext} from "react";
import('./cart-icon.styles.scss');

const CartIcon = ({onClick}) => {
    const { items } = useContext(CartContext);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="cart-icon-container" onClick={onClick}>
            <ShoppingBagIcon className="shopping-icon" />
            <span className="item-count">{count}</span>
        </div>
    )
}

export default CartIcon;
