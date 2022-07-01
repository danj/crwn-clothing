import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {CartContext} from "../../contexts/cart.context";
import {useContext} from "react";

import('./product-card.styles.scss');

const ProductCard = ({product}) => {
    const { addItemToCart } = useContext(CartContext);
    const addToCart = () => addItemToCart(product);

    return (
        <div className="product-card-container">
            <img src={product.imageUrl} alt={`This is the ${product.name}`}/>
            <div className="footer">
                <span className="name">{product.name}</span>
                <span className="price">{product.price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCart}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;
