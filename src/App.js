import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Bee from "./components/bee/Bee";
import About from "./components/about/About";
import Login from "./components/login/Login";
import Customer from "./components/customer/Customer";

const App = () => {
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
            e.returnValue = "";
        }
        return "";
    };

    return (
        <Router>
            <Navbar />
            <div className="container">
                        <Routes>
                            <Route path="/" element={<Bee/>} />
                            <Route path="/home" element={<Bee/>} />
                            <Route path="/about" element={<About/>} />
                            <Route path="/login" element={<Login/>} />
                            <Route path="/customer" element={<Customer/>} />
                        </Routes>
            </div>
        </Router>
    );

};

export default App;
