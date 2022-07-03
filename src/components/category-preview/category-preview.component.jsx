import ProductCard from "../product-card/product-card.component";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import ('./category-preview.styles.scss');

const CategoryPreview = ({title, products}) => {
    const matchMedia = window.matchMedia("(max-width: 800px)");

    const [matches, setMatches] = useState(matchMedia.matches);
    const onChange = (e) => setMatches( e.matches );

    useEffect(() => {
        matchMedia.addEventListener('change', onChange);
        return () => { matchMedia.removeEventListener('change', onChange) };
    }, []);

    return (
        <div className="category-preview-container">
            <h2><Link to={title.toLowerCase()} className="title">{title.toUpperCase()}</Link></h2>
            <div className="preview">
                { products.slice(0, matches ? 2 : 4).map((p) => (<ProductCard key={p.id} product={p}/>)) }
            </div>
        </div>

    )
}

export default CategoryPreview
