import Home from "./routes/home/home.component";
import {Routes, Route, Link} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/authentication/authentication.component";

const Shop = () => (
    <>
        <h1>This is the shop</h1>
    </>
)

const App = () => (
    <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="sign-in" element={<SignIn />} />
        </Route>
    </Routes>
)

export default App;
