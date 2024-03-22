import React from "react";
import style from './Navbar.module.css';
import Searchbar from "../Searchbar/Searchbar";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

    const location = useLocation();
    

    return (
        <nav className={style.container}>
            <div className={style.container1}>
                <h1 className={style.logo}><span>SPEED</span> PILOTS</h1>
                <ul>
                    <Link to={'/'}>
                        <li>Start</li>
                    </Link>
                    {
                        location.pathname !== '/home' && (
                        <Link to={'/home'}>
                            <li>Home</li>
                        </Link>
                        )                
                    }
                    {
                        location.pathname !== '/create' && (
                            <Link to={'/create'}>
                                <li>Create</li>
                            </Link>
                        )
                    }
                </ul>
            </div>
            
            <div className={style.container2}>
                {
                    location.pathname !== '/create' && (
                        <Searchbar />
                    )
                }
            </div>

        </nav>
    )
}

export default Navbar;