import Home from "./routes/home/home.component";
import {Route, Routes} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Shop from "./routes/shop/shop.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments, onAuthStateChangeListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.actions";
import {useDispatch} from "react-redux";
import {setCategoriesMap} from "./store/categories/categories.reducer";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const helper = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            dispatch(setCategoriesMap(categoriesMap));
        }
        helper();
    }, []);

    useEffect(() => {
        return onAuthStateChangeListener(async (user) => {
            dispatch(await setCurrentUser(user));
        });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<SignIn />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    )
}

export default App;
