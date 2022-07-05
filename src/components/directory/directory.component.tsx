import CategoryItem from "../category-item/category-item.component";
import {DirectoryContainer} from "./directory.styles";
import {Category} from "../../types/types";

type DirectoryProps = {
    categories: Category[]
}

const Directory = ({categories}: DirectoryProps) => (
    <DirectoryContainer>
        {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
        ))}
    </DirectoryContainer>
)

export default Directory;
