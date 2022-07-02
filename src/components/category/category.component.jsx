import ProductCard from "../product-card/product-card.component";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CategoryContainer} from "./category.styles";
import {useSelector} from "react-redux";
import {categoriesMapSelector} from "../../store/categories/categories.reducer";

import('./category.styles');

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(categoriesMapSelector);
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
