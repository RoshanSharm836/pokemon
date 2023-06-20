import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import Singlepoke from "./Singlepoke";
import Home from "./Home";
import Bookmark from "./Bookmark";
function Reactroute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<App />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/poke/:name/:id" element={<Singlepoke />} />
        {/* <Route path="*" element={<PageNotFounf />} /> */}
      </Routes>
    </>
  );
}

export default Reactroute;
