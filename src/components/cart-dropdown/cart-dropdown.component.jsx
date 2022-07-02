import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cartItemsSelector} from "../../store/cart/cart.selectors";
import {closeCart} from "../../store/cart/cart.actions";

import('./cart-dropdown.styles.scss');

const CartDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = Array.from(useSelector(cartItemsSelector).values());

    const onCheckoutClick = () => {
        dispatch(closeCart());
        navigate("/checkout");
    }   

    return (
        <div className="cart-dropdown-container">
            {items.length ? (
                <div className="cart-items">
                    { items.map((item) => <CartItem key={item.id} item={item} />) }
                </div>)
                : <span className="empty-message">Empty</span>
            }
            <Button onClick={onCheckoutClick}>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;
