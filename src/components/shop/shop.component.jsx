import {useContext} from "react";
import {ProductsContext} from "../../contexts/products.context";

const Shop = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div className="shop-container">
            <h1>This is the shop</h1>
            {products ?
                products.map((p) => (<p key={p.id}>{p.name}</p>))
                : <p>No products in the shop</p>
            }
        </div>
    )
}

export default Shop;
