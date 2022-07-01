import ProductCard from "../product-card/product-card.component";
import {Link} from "react-router-dom";
import ('./category-preview.styles.scss');

const CategoryPreview = ({title, products}) => {
    return (
        <div className="category-preview-container">
            <h2><Link to={title.toLowerCase()} className="title">{title.toUpperCase()}</Link></h2>
            <div className="preview">
                { products.slice(0,4).map((p) => (<ProductCard key={p.id} product={p}/>)) }
            </div>
        </div>

    )
}

export default CategoryPreview
