import { Link, useNavigate } from 'react-router-dom';
function Header() {
    const qty = JSON.parse(localStorage.getItem('dataQty'));
    const userLogin = JSON.parse(localStorage.getItem('checkLogin'));
    const navigate = useNavigate();
    function renderLogin() {
        if(userLogin == true) {
            return (
                    <li><Link to="/login" onClick={logout}><i className="fa fa-lock"></i>Logout</Link></li>
            )
        } else {
            return (
                    <li><Link to="/login" ><i className="fa fa-lock"></i>Login</Link></li>
            )
        }
    }
    function renderQty() {
        if(userLogin == true) {
            return (
                <li><Link to="/cart" className="cart-total"><i className="fa fa-shopping-cart"> <sup style={{fontSize: "12.5px"}}>{qty}</sup></i> Cart</Link></li>
            )
        } else {
            return (
                <li><Link to="/cart" className="cart-total"><i className="fa fa-shopping-cart"></i> Cart</Link></li>
            )
        }
    }
    function logout() {
        navigate('/login');
        localStorage.clear();
    }
    return (
        <header id="header">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><Link to="#"><i className="fa fa-phone" /> +2 95 01 88 821</Link></li>
                                    <li><Link to="#"><i className="fa fa-envelope" /> info@domain.com</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><Link to="#"><i className="fa fa-facebook" /></Link></li>
                                    <li><Link to="#"><i className="fa fa-twitter" /></Link></li>
                                    <li><Link to="#"><i className="fa fa-linkedin" /></Link></li>
                                    <li><Link to="#"><i className="fa fa-dribbble" /></Link></li>
                                    <li><Link to="#"><i className="fa fa-google-plus" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 clearfix">
                            <div className="logo pull-left">
                                <Link to="/home"><img src="../../images/home/logo.png" alt="" /></Link>
                            </div>
                            <div className="btn-group pull-right clearfix">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        USA
                                        <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="#">Canada</Link></li>
                                        <li><Link to="#">UK</Link></li>
                                    </ul>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        DOLLAR
                                        <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="#">Canadian Dollar</Link></li>
                                        <li><Link to="#">Pound</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 clearfix">
                            <div id="nav-shop" className="shop-menu clearfix pull-right">
                                <ul className="nav navbar-nav">
                                    <li><Link to="/account/update" ><i className="fa fa-user"></i> Account</Link></li>
                                    <li><Link to="/wishlist"><i className="fa fa-star"></i> Wishlist</Link></li>
                                    <li><Link to="#"><i className="fa fa-crosshairs"></i> Checkout</Link></li>
                                    {renderQty()}
                                    {/* <li><Link to="/cart" className="cart-total"><i className="fa fa-shopping-cart"> <sup style={{fontSize: "12.5px"}}> {qty}</sup></i> Cart</Link></li> */}
                                    {renderLogin()}
                                    {/* <li><Link to="/login">{renderLogin()}</Link></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to="/" className="active">Home</Link></li>
                                    <li className="dropdown"><Link to="#">Shop<i className="fa fa-angle-down" /></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="#">Products</Link></li>
                                            <li><Link to="#">Product Details</Link></li>
                                            <li><Link to="#">Checkout</Link></li>
                                            <li><Link to="/cart">Cart</Link></li>
                                            <li><Link to="/login">Login</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><Link to="#">Blog<i className="fa fa-angle-down" /></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="/blog/list">Blog List</Link></li>
                                            <li><Link to="#">Blog Single</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="#">404</Link></li>
                                    <li><Link to="#">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;