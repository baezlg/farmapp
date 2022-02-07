import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import Stats from "./pages/stats/Stats";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  );
};

export default App;
