import ProductCard from "../product-card/product-card.component";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CategoryContainer} from "./category.styles";
import {useSelector} from "react-redux";
import {categoriesMapSelector} from "../../store/categories/categories.reducer";
import {Product} from "../../types/types";

type CategoryRouteParams = {
    category: string;
};

const Category = () => {
    let { category } = useParams<keyof  CategoryRouteParams>() as CategoryRouteParams;
    console.log(`Rendering category ${category}`);

    const categoriesMap = useSelector(categoriesMapSelector);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (categoriesMap && categoriesMap[category]) {
            try {
                setProducts(categoriesMap[category]);
            } catch (e) {
                console.log(`error settings products for category ${category}`);
            }

        }
    }, [category, categoriesMap]);

    return (
        <CategoryContainer>
            <span className="title">{category?.toUpperCase()}</span>
            <div className="preview">
                { products.map((p) => (<ProductCard key={p.id} product={p}/>)) }
            </div>
        </CategoryContainer>
    )
}

export default Category;
