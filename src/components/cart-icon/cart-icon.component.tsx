import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import {useSelector} from "react-redux";
import {cartItemCountSelector} from "../../store/cart/cart.selectors";
import {CartIconContainer} from "./cart-icon.styles";
import {MouseEventHandler} from "react";
import('./cart-icon.styles');

type CartIconProps = {
    onClick: MouseEventHandler;
}

const CartIcon = ({onClick}: CartIconProps) => {
    const itemCount = useSelector(cartItemCountSelector);

    return (
        <CartIconContainer onClick={onClick}>
            <ShoppingBagIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </CartIconContainer>
    )
}

export default CartIcon;
