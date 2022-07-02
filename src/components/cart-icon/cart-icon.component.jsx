import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import {useSelector} from "react-redux";
import {cartItemCountSelector} from "../../store/cart/cart.selectors";
import('./cart-icon.styles.scss');

const CartIcon = ({onClick}) => {
    const itemCount = useSelector(cartItemCountSelector);

    return (
        <div className="cart-icon-container" onClick={onClick}>
            <ShoppingBagIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
    )
}

export default CartIcon;
