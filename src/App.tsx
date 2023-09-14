import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./Components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
