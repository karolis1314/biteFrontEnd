import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Bee from "./components/bee/Bee";
import About from "./components/about/About";

function App() {
  return (
    <div>
      <Navbar />
        <Bee/>
        <About/>
    </div>
  );
}

export default App;
