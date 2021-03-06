import Home from "./routes/home/home.component";
import {Route, Routes, useNavigate} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Shop from "./routes/shop/shop.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments, onAuthStateChangeListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.actions";
import {useDispatch} from "react-redux";

import { GlobalStyle} from "./global.styles";
import { fetchCategoriesStart} from "./store/categories/categories.actions";

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return onAuthStateChangeListener(async (user) => {
            if (user) {
                navigate('/');
            }
            dispatch(await setCurrentUser(user));
        });
    }, []);

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, []);

    return (
        <div>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="auth" element={<SignIn />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;
