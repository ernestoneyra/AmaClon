import React from "react";
import {useSelector} from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { SIGNIN } from "../constants/routes";

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          userInfo && userInfo.isAdmin ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to={SIGNIN} />
          )
        }
      ></Route>
    </>
  );
}
