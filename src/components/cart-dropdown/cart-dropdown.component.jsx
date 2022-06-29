import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";

import('./cart-dropdown.styles.scss');

const CartDropdown = () => {
    const { items } = useContext(CartContext);

    return (
        <div className="cart-dropdown-container">
            {items ? (
                <div className="cart-items">
                    { items.map((item) => <CartItem key={item.id} item={item} />) }
                </div>)
                : <span className="empty-message">Empty</span>
            }
            <Button>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;
