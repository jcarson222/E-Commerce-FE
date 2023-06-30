import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { NavProvider } from "./context/nav_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

// //domain
// dev - yypvst5623recfc5.us.auth0.com;
// //clientId
// xTJtzx9OHlsh9y2nOAf3zXfSqQrDK6Y8;

root.render(
  <Auth0Provider
    domain="dev-yypvst5623recfc5.us.auth0.com"
    clientId="xTJtzx9OHlsh9y2nOAf3zXfSqQrDK6Y8"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <NavProvider>
              <App />
            </NavProvider>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
