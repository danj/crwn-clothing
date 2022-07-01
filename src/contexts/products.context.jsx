import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
    products: [],
    setProducts: (value) => null,
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const value = { products, setProducts };

    useEffect(() => {
        const helper = async () => {
            const categories = await getCategoriesAndDocuments();
            setProducts(categories['jackets']);
            console.log(categories);
        }
        helper();
    }, []);

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
}
