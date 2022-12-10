import React from "react";
import ReactDom from "react-dom";
import Root from './components/root'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDom.render(Root, root);
});