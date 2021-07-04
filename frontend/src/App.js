/* REACT */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
/* VIEWS */
import Cart from "./views/Cart.jsx";
import Home from "./views/Home.jsx";
import Product from "./views/Product.jsx";
import SignIn from "./views/SignIn.jsx";
import Register from "./views/Register.jsx";
import ShippingAddress from "./views/ShippingAddress.jsx";
import PaymentMethod from "./views/PaymentMethod.jsx";
import PlaceOrder from "./views/PlaceOrder.jsx";
import Order from "./views/Order.jsx";
import OrderHistory from "./views/OrderHistory.jsx";
import Profile from "./views/Profile.jsx";
import ProductList from "./views/ProductList.jsx";
import ProductEdit from "./views/ProductEdit.jsx";
import OrderList from "./views/OrderList.jsx";
import UserList from "./views/UserList.jsx";
import UserEdit from "./views/UserEdit.jsx";
/* ROUTES */
import * as ROUTES from "./constants/routes";
import PrivateRoute from "./components/PrivateRoute.js";
import AdminRoute from "./components/AdminRoute.js";
/* COMPONENTS */
import { signout } from "./actions/userActions.js";
import SearchBox from "./components/SearchBox.js"
import Search from "./views/Search.jsx";
import { listProductCategories } from "./actions/productActions.js";
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import SearchScreen from "./views/Search.jsx";


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };


  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to={ROUTES.HOME}>
              AmaClon
            </Link>
          </div>
          <div>
            {/* pass react-router-com properties to the searchbox using the render function. history is property of react-router-dom. that is why inside {}  */}
            <Route
              render={({history}) => <SearchBox history={history}></SearchBox>}
            ></Route>
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
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path={ROUTES.CART} component={Cart} />
          <Route exact path={ROUTES.PRODUCT} component={Product} />
          <Route
            exact
            path={ROUTES.PRODUCT_EDIT}
            component={ProductEdit}
          />
          <Route path={ROUTES.SHIPPING} component={ShippingAddress} />
          <Route path={ROUTES.SIGNIN} component={SignIn} />
          <Route path={ROUTES.ORDER} component={Order} />
          <Route path={ROUTES.REGISTER} component={Register} />
          <Route path={ROUTES.PAYMENT_METHOD} component={PaymentMethod} />
          <Route path={ROUTES.PLACE_ORDER} component={PlaceOrder} />
          <Route path={ROUTES.ORDER_HISTORY} component={OrderHistory} />
          <Route exact path={ROUTES.SEARCH} component={Search} />
          <Route exact path={ROUTES.CATEGORY} component={Search} />
          <Route exact path={ROUTES.CATEGORY_NAME} component={Search} />
          <Route exact path={ROUTES.SEARCH_FILTER} component={Search} />
          <PrivateRoute path={ROUTES.PROFILE} component={Profile} />
          <AdminRoute path={ROUTES.ORDERLIST} component={OrderList} />
          <AdminRoute path={ROUTES.USER_LIST} component={UserList} />
          <AdminRoute path={ROUTES.EDIT_USER} component={UserEdit} />
          <AdminRoute path={ROUTES.PRODUCTLIST} component={ProductList} />
          <Route exact path={ROUTES.HOME} component={Home} />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
