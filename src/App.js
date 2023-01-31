import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Bee from "./components/bee/Bee";
import About from "./components/about/About";
import Login from "./components/login/Login";
import Customer from "./components/customer/Customer";
import Account from "./components/account/Account";
import Msisdn from "./components/msisdn/Msisdn";
import Order from "./components/order/Order";

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
                            <Route path="/account" element={<Account/>} />
                            <Route path="/msisdn" element={<Msisdn/>} />
                            <Route path="/order" element={<Order/>} />
                        </Routes>
            </div>
        </Router>
    );

};

export default App;
