import CategoryItem from "../category-item/category-item.component";
import {DirectoryContainer} from "./directory.styles";
import {Category} from "../../types/types";
import {useSelector} from "react-redux";
import {categoriesIsLoadingSelector, categoriesSelector} from "../../store/categories/categories.selectors";
import {Spinner} from "../spinner/spinner.component";


const Directory = () => {
    const categoriesIsLoading = useSelector(categoriesIsLoadingSelector);
    const categories: Category[] = useSelector(categoriesSelector);

    return (
        <DirectoryContainer>
            {
                categoriesIsLoading ? <Spinner/>
                    : categories.map((category) => (
                        <CategoryItem key={category.id} category={category}/>
                    ))
            }
        </DirectoryContainer>
    )
}

export default Directory;
