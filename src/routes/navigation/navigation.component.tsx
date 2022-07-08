import {Outlet} from 'react-router-dom';
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {LogoContainer, NavigationContainer, NavLink, NavlinkContainer} from "./navigation.styles";
import {currentUserDisplayNameSelector, currentUserSelector} from "../../store/user/user.selectors";
import {useDispatch, useSelector} from "react-redux";
import {cartIsOpenSelector} from "../../store/cart/cart.selectors";
import {toggleCartOpen} from "../../store/cart/cart.actions";

const Navigation = () => {
    const currentUser = useSelector(currentUserSelector);
    const displayName = useSelector(currentUserDisplayNameSelector);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(cartIsOpenSelector);
    const toggleCart = () => dispatch(toggleCartOpen());
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
                    <CartIcon onClick={toggleCart} />
                </NavlinkContainer>
                { isCartOpen && <CartDropdown /> }
            </NavigationContainer>
            <Outlet/>
        </>
    );
}

export default Navigation
