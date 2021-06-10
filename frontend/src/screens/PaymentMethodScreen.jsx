import React, { useState } from "react";
import Checkoutsteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { PLACE_ORDER, SHIPPING } from "../constants/routes";
import { savePaymentMethod } from "../actions/cartActions";

export default function PaymentMethodScreen(props) {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  if(!shippingAddress.address){
    props.history.push(SHIPPING)
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push(PLACE_ORDER);
  };
  return (
    <>
      <Checkoutsteps step1 step2 step3></Checkoutsteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              require='true'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="PayPal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              require='true'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </>
  );
}
