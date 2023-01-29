import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Bee from "./components/bee/Bee";
import About from "./components/about/About";

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
        component = <Bee/>;
        break;
    case "/about":
        component = <About/>;
        break;
    default:
        component = <Bee/>;
  }
  return (
      <>
            <Navbar/>
            {component}
      </>

  );
}

export default App;
