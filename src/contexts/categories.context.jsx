import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    useEffect(() => {
        const helper = async () => {
            const categoriesMap_ = await getCategoriesAndDocuments();
            setCategoriesMap(categoriesMap_);
        }
        helper();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
}
