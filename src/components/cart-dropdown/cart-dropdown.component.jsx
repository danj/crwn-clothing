import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

import('./cart-dropdown.styles.scss');

const CartDropdown = () => {
    const { items, setCartOpen } = useContext(CartContext);

    let navigate = useNavigate();

    const onCheckoutClick = () => {
        setCartOpen(false);
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
