import React, {useState} from 'react'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import './Navbar.css'

const Navbar = () => {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    return (
        <div className='navbar'>
            <div className="container">
                <h1 style={{ marginLeft: '1rem', color: '#AFE1AF'}} >Bite</h1>
                <ul className={click ? 'nav active' : 'nav'}>
                    <li className="nav-item">
                        <a href="/bee">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/">Service</a>
                    </li>
                    <li className="nav-item">
                        <a href="/">Account</a>
                    </li>
                    <li className="nav-item">
                        <a href="/">Customer</a>
                    </li>
                    <li className="nav-item">
                        <a href="/about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className='btn' href="/">Login</a>
                    </li>
                </ul>
                <div onClick={handleClick} className="hamburger">
                    {click ? (<AiOutlineClose className='icon' />) : (<AiOutlineMenu className='icon' />)}

                </div>
            </div>
        </div>
    )
}

export default Navbar