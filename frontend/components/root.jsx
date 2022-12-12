import React from "react";
import { Route, Routes } from "react-router";
import FirstPage from "./firstPage/FirstPage";
import SecondPage from "./secondPage/SecondPage";

const Root = () => (
  <Routes>
    <Route path="/" element={<FirstPage/>}/>
    <Route path="/results" element={<SecondPage/>}/>
  </Routes>
) 




export default Root;