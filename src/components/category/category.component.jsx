import ProductCard from "../product-card/product-card.component";
import {useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import {useParams} from "react-router-dom";

import('./category.styles.scss');

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category]);

    return (
        <>
            <h2>{category.toUpperCase()}</h2>
            <div className="category-container">
                <div className="preview">
                    { products.map((p) => (<ProductCard key={p.id} product={p}/>)) }
                </div>
            </div>
        </>
    )
}

export default Category;
