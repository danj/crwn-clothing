import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../../store/cart/cart.actions";
import {ProductCardContainer} from "./product-card.styles";
import {Product} from "../../types/types";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
    const dispatch = useDispatch();
    const addToCart = () => dispatch(addItemToCart(product));

    return (
        <ProductCardContainer>
            <img src={product.imageUrl} alt={`This is the ${product.name}`}/>
            <div className="footer">
                <span className="name">{product.name}</span>
                <span className="price">{product.price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;
