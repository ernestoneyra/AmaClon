import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import * as ROUTES from "./constants/routes";
import SignInScreen from "./screens/SignInScreen.jsx";
import { signout } from "./actions/userActions.js";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingAddressScreen from "./screens/ShippingAddressScreen.jsx";
import PaymentMethodScreen from "./screens/PaymentMethodScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";

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
                  <Link to={ROUTES.SIGNOUT} onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to={ROUTES.SIGNIN} className="upper-right">
                Sign In
              </Link>
            )}
          </div>
        </header>
        <main>
          <Route path={ROUTES.CART} component={CartScreen} />
          <Route path={ROUTES.PRODUCT} component={ProductScreen} />
          <Route path={ROUTES.SHIPPING} component={ShippingAddressScreen} />
          <Route path={ROUTES.SIGNIN} component={SignInScreen} />
          <Route path={ROUTES.ORDER} component={OrderScreen} />
          <Route path={ROUTES.REGISTER} component={RegisterScreen} />
          <Route path={ROUTES.PAYMENT_METHOD} component={PaymentMethodScreen} />
          <Route path={ROUTES.PLACE_ORDER} component={PlaceOrderScreen} />
          <Route exact path={ROUTES.HOME} component={HomeScreen} />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
