import ProductCard from "../product-card/product-card.component";
import {Link} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {CategoryPreviewContainer} from "./category-preview.styles";
import {Product} from "../../types/types";
import ('./category-preview.styles');

type CategoryPreviewProps = {
    title: string,
    products: Product[]
}

const CategoryPreview = ({title, products}: CategoryPreviewProps) => {
    const matchMedia = window.matchMedia("(max-width: 800px)");

    const [matches, setMatches] = useState(matchMedia.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches( e.matches );

    useEffect(() => {
        matchMedia.addEventListener('change', onChange);
        return () => { matchMedia.removeEventListener('change', onChange) };
    }, []);

    return (
        <CategoryPreviewContainer>
            <h2><Link to={title.toLowerCase()} className="title">{title.toUpperCase()}</Link></h2>
            <div className="preview">
                { products.slice(0, matches ? 2 : 4).map((p) => (<ProductCard key={p.id} product={p}/>)) }
            </div>
        </CategoryPreviewContainer>

    )
}

export default CategoryPreview
