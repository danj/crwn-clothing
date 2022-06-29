import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import('./cart-icon.styles.scss');

const CartIcon = ({onClick}) => {
    const count = 7;
    return (
        <div className="cart-icon-container" onClick={onClick}>
            <ShoppingBagIcon className="shopping-icon" />
            <span className="item-count">{count}</span>
        </div>
    )
}

export default CartIcon;
