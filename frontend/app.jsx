import React from "react";
import ReactDom from "react-dom";
import Root from './components/root'
import { BrowserRouter } from "react-router-dom";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDom.render(
  <BrowserRouter><Root className="root-container"/></BrowserRouter>
  , root);
});
