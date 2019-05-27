import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Imported with a view to have allowed Higher Order Components (App) to pass routing to other component for navigation purposes
//import { BrowserRouter, Route, Link } from "react-router-dom"; Imported but not used, would do so to link navigation in production
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
