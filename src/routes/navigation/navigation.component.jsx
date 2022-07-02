import {Outlet} from 'react-router-dom';
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import {useContext} from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";
import {LogoContainer, NavigationContainer, NavLink, NavlinkContainer} from "./navigation.styles";
import {currentUserDisplayNameSelector, currentUserSelector} from "../../store/user/user.selector";
import {useSelector} from "react-redux";



const Navigation = () => {
    const currentUser = useSelector(currentUserSelector);
    const displayName = useSelector(currentUserDisplayNameSelector);
    const { isCartOpen, setCartOpen } = useContext(CartContext);

    const toggleCartOpen = () => setCartOpen(!isCartOpen);

    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="crwn-logo"/>
                </LogoContainer>
                <NavlinkContainer>
                    <NavLink to="/shop">SHOP</NavLink>
                    {currentUser ?
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT ({displayName})</NavLink> :
                        <NavLink to="/auth">SIGN IN</NavLink>
                    }
                    <CartIcon onClick={toggleCartOpen} />
                </NavlinkContainer>
                { isCartOpen && <CartDropdown /> }
            </NavigationContainer>
            <Outlet/>
        </>
    );
}

export default Navigation
