import CategoryPreview from "../category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {categoriesIsLoadingSelector, categoriesMapSelector} from "../../store/categories/categories.selectors";
import {Spinner} from "../spinner/spinner.component";

const CategoriesPreview = () => {
    const categoriesLoading = useSelector(categoriesIsLoadingSelector);
    const categoriesMap = useSelector(categoriesMapSelector);

    return (
        <>
            {categoriesLoading ? <Spinner/>
                : (categoriesMap &&
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title.toUpperCase()} products={products} />
                }))
            }
        </>
    )
}

export default CategoriesPreview;
