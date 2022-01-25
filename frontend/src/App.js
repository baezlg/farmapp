import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
