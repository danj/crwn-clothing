import Home from "./routes/home/home.component";
import {Routes, Route, Link} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Shop from "./routes/shop/shop.component";

const App = () => (
    <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<SignIn />} />
            <Route path="checkout" element={<Checkout />} />
        </Route>
    </Routes>
)

export default App;
