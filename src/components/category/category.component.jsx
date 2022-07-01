import ProductCard from "../product-card/product-card.component";
import {useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import {useParams} from "react-router-dom";
import {CategoryContainer} from "./category.styles";

import('./category.styles');

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (categoriesMap && categoriesMap[category]) {
            setProducts(categoriesMap[category]);
        }
    }, [category, categoriesMap]);

    return (
        <>

            <CategoryContainer>
                <span className="title">{category.toUpperCase()}</span>
                <div className="preview">
                    { products.map((p) => (<ProductCard key={p.id} product={p}/>)) }
                </div>
            </CategoryContainer>
        </>
    )
}

export default Category;
