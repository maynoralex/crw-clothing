import { Outlet, Link } from "react-router";
import CrwnLogo  from '../../../assets/crown.svg?react';
import './navigation.styles.scss';

const Navigation = () =>
{
    return (
        <>
            <div className="navigation-bar">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/">HOME</Link>
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    <Link className="nav-link" to="/auth">SIGN IN</Link>
                </div>

            </div>
            <Outlet />
        </>
        
    );
}

export default Navigation;