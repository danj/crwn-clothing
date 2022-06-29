import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import {Link} from "react-router-dom";

import('./cart-dropdown.styles.scss');

const CartDropdown = () => {
    const { items, setCartOpen } = useContext(CartContext);
    const closeCart = () => { setCartOpen(false); }

    return (
        <div className="cart-dropdown-container">
            {items ? (
                <div className="cart-items">
                    { items.map((item) => <CartItem key={item.id} item={item} />) }
                </div>)
                : <span className="empty-message">Empty</span>
            }
            <Link to="/checkout"><Button onClick={closeCart}>GO TO CHECKOUT</Button></Link>
        </div>
    );
}

export default CartDropdown;
