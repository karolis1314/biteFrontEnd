import React, {useState} from 'react'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import {Link, useMatch, useResolvedPath} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    return (
        <div className='navbar'>
            <div className="container">
                <h1 style={{ marginLeft: '1rem', color: '#AFE1AF'}} >Bite</h1>
                <ul className={click ? 'nav active' : 'nav'}>
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/msisdn">MSISDN</CustomLink>
                    <CustomLink to="/account">Account</CustomLink>
                    <CustomLink to="/customer">Customer</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/order">Order</CustomLink>
                    <li className="nav-item">
                        <Link className='btn' to="/login">Login</Link>
                    </li>
                </ul>
                <div onClick={handleClick} className="hamburger">
                    {click ? (<AiOutlineClose className='icon' />) : (<AiOutlineMenu className='icon' />)}

                </div>
            </div>
        </div>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvePath = useResolvedPath(to);
    const isActive = useMatch({path : resolvePath.pathname, end : true});

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props} >{children}</Link>
        </li>
    );
}

export default Navbar