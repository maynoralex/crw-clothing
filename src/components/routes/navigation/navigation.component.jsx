import { Outlet, Link } from "react-router";
import { useContext } from "react";

import CrwnLogo  from '../../../assets/crown.svg?react';
import './navigation.styles.scss';
import { UserContext } from "../../../contexts/user.context";
import { SignOutUser } from "../../../utils/firebase/firebase";


const Navigation = () =>
{
    const { currentUser } = useContext(UserContext);
    return (
        <>
            <div className="navigation-bar">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/">HOME</Link>
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={SignOutUser}>SIGN OUT</span> 
                     ) : (
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                     )
                    }
                    
                </div>

            </div>
            <Outlet />
        </>
        
    );
}

export default Navigation;