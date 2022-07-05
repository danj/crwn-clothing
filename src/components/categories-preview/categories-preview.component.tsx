import CategoryPreview from "../category-preview/category-preview.component";
import {categoriesMapSelector} from "../../store/categories/categories.reducer";
import {useSelector} from "react-redux";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(categoriesMapSelector);

    return (
        <>
            {categoriesMap &&
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title.toUpperCase()} products={products} />
                })
            }
        </>
    )
}

export default CategoriesPreview;
