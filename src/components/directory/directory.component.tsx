import CategoryItem from "../category-item/category-item.component";
import {DirectoryContainer} from "./directory.styles";
import {Category} from "../../types/types";
import {useSelector} from "react-redux";
import {categoriesSelector} from "../../store/categories/categories.reducer";


const Directory = () => {
    const categories: Category[] = useSelector(categoriesSelector);

    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category}/>
            ))}
        </DirectoryContainer>
    )
}

export default Directory;
