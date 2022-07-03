import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../../components/categories-preview/categories-preview.component";
import Category from "../../components/category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {setCategoriesMap} from "../../store/categories/categories.reducer";
import {useDispatch} from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const helper = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            dispatch(setCategoriesMap(categoriesMap));
        }
        helper();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    )
}

export default Shop;
