import { Outlet, Link } from "react-router";

const Navigation = () =>
{
    return (
        <>
            <div className="navigation-bar">
                <div>Logo</div>
                <div class="nav-links-container">
                    <Link className="nav-link" to="/">HOME</Link>
                    <Link className="nav-link" to="/shop">SHOP</Link>
                </div>
                <h1>This is the navigation bar.</h1>
            </div>
            <Outlet />
        </>
        
    );
}

export default Navigation;