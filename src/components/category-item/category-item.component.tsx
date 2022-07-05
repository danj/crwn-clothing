import {CategoryContainer} from "./category-item.styles";
import {useNavigate} from "react-router-dom";
import {Category} from "../../types/types";

type CategoryItemProps = {
    category: Category
}

const CategoryItem = ({category}: CategoryItemProps) => {
    const navigate = useNavigate();

    const shopNow = () => {
        navigate(`/shop/${category.title.toLowerCase()}`);
    }

    return (
        <CategoryContainer>
            <div className="background-image" onClick={shopNow} style={{backgroundImage: `url(${category.imageUrl})`}}/>
            <div className="category-body-container" onClick={shopNow}>
                <h2>{category.title}</h2>
                <p>Shop Now</p>
            </div>
        </CategoryContainer>
    )
}

export default CategoryItem;
