/* REACT */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
/* SCREENS */
import CartScreen from "./screens/CartScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import SignInScreen from "./screens/SignInScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingAddressScreen from "./screens/ShippingAddressScreen.jsx";
import PaymentMethodScreen from "./screens/PaymentMethodScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import OrderHistoryScreen from "./screens/OrderHistoryScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import ProductListScreen from "./screens/ProductListScreen.jsx";
import ProductEditScreen from "./screens/ProductEditScreen.jsx";
/* ROUTES */
import * as ROUTES from "./constants/routes";
import PrivateRoute from "./components/PrivateRoute.js";
import AdminRoute from "./components/AdminRoute.js";
/* COMPONENTS */
import { signout } from "./actions/userActions.js";


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to={ROUTES.HOME}>
              AmaClon
            </Link>
          </div>
          <div>
            <Link to={ROUTES.CART}>
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#" className="upper-right">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to={ROUTES.PROFILE}>User Profile</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.ORDER_HISTORY}>Order History</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.SIGNOUT} onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={ROUTES.SIGNIN} className="upper-right">
                Sign In
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to={ROUTES.ADMIN}>
                  Admin {""} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.PRODUCTLIST}>Products</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.ORDERLIST}>Orders</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.USERLIST}>Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path={ROUTES.CART} component={CartScreen} />
          <Route exact path={ROUTES.PRODUCT} component={ProductScreen} />
          <Route exact path={ROUTES.PRODUCT_EDIT} component={ProductEditScreen} />
          <Route path={ROUTES.SHIPPING} component={ShippingAddressScreen} />
          <Route path={ROUTES.SIGNIN} component={SignInScreen} />
          <Route path={ROUTES.ORDER} component={OrderScreen} />
          <Route path={ROUTES.REGISTER} component={RegisterScreen} />
          <Route path={ROUTES.PAYMENT_METHOD} component={PaymentMethodScreen} />
          <Route path={ROUTES.PLACE_ORDER} component={PlaceOrderScreen} />
          <Route path={ROUTES.ORDER_HISTORY} component={OrderHistoryScreen} />
          <PrivateRoute path={ROUTES.PROFILE} component={ProfileScreen} />
          <AdminRoute path={ROUTES.PRODUCTLIST} component={ProductListScreen} />
          <Route exact path={ROUTES.HOME} component={HomeScreen} />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
