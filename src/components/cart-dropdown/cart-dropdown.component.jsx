import Button from "../button/button.component";

import('./cart-dropdown.styles.scss');

const CartDropdown = () => {
    const items = [
        {
            id: 1,
            name: 'a'
        },
        {
            id: 2,
            name: 'b'
        }
    ];

    return (
        <div className="cart-dropdown-container">
            {items ? (
                <div className="cart-items">
                    { items.map((item) => (
                    <div key={item.id}>{item.name}</div>
                )) }
                </div>)
                : <span className="empty-message">Empty</span>
            }
            <Button>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;
