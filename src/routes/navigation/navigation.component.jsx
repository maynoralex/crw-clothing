import { Outlet, Link } from "react-router";
import { useContext } from "react";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

import CrwnLogo  from '../../assets/crown.svg?react';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { SignOutUser } from "../../utils/firebase/firebase";


const Navigation = () =>
{
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

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