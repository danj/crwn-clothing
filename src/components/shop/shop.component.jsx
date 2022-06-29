import {useContext} from "react";
import {ProductsContext} from "../../contexts/products.context";
import ProductCard from "../product-card/product-card.component";
import('./shop.styles.scss');

const Shop = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div className="shop-container">
            <h1>This is the shop</h1>
            <div className="products-container">
                {products ?
                    products.map((p) => (<ProductCard key={p.id} product={p} />))
                    : <p>No products in the shop</p>
                }
            </div>

        </div>
    )
}

export default Shop;
