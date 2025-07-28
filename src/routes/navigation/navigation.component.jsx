import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

import CrwnLogo  from '../../assets/crown.svg?react';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { SignOutUser } from "../../utils/firebase/firebase";
import { selectCurrentUser } from '../../store/user/user.selector' 

const Navigation = () =>
{
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    

    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/">HOME</NavLink>
                    <NavLink to="/shop">SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as = "span" onClick={SignOutUser}>SIGN OUT</NavLink> 
                     ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                     )
                    }
                    <CartIcon />    
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
        
    );
}

export default Navigation;