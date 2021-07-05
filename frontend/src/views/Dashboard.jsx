import React from "react";

export default function Dashboard() {
  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      <ul className="row summary">
        <li>
          <div className="summary-title color1">
            <span>
              <i className="fa fa-users" /> Users
            </span>
          </div>
        </li>
        <li>
          <div className="summary-title color2">
            <span>
              <i className="fa fa-shopping-cart" /> Orders
            </span>
          </div>
          <div className="summary-body"></div>
        </li>
        <li>
          <div className="summary-title color3">
            <span>
              <i className="fa fa-money" /> Sales
            </span>
          </div>
        </li>
      </ul>
      <div>
        <div>
          <h2>Sales</h2>
        </div>
      </div>
      <div>
        <h2>Categories</h2>
      </div>
    </div>
  );
}
