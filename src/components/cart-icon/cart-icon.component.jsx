import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import {CartContext} from "../../contexts/cart.context";
import {useContext} from "react";
import('./cart-icon.styles.scss');

const CartIcon = ({onClick}) => {
    const { items, itemCount } = useContext(CartContext);

    return (
        <div className="cart-icon-container" onClick={onClick}>
            <ShoppingBagIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
    )
}

export default CartIcon;
