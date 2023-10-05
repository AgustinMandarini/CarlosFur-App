import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/redux/store";
import App from "./App";
import "./index.css";
import {
  getColor,
  getMaterial,
  getProducts,
  getProductType,
} from "./redux/actions";
import reportWebVitals from "./reportWebVitals";

store.dispatch(getProducts());
store.dispatch(getProductType());
store.dispatch(getColor());
store.dispatch(getMaterial());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//tobi
