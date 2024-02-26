import React from "react";
import style from './Navbar.module.css';
import Searchbar from "../Searchbar/Searchbar";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={style.container}>
            <div className={style.container1}>
                <h1 className={style.logo}><span>SPEED</span> PILOTS</h1>
                <ul>
                    <Link to={'/'}>
                        <li>Start</li>
                    </Link>
                    <Link to={'/home'}>
                        <li>Home</li>
                    </Link>
                    <Link to={'/create'}>
                        <li>Create</li>
                    </Link>
                </ul>
            </div>
            
            <div className={style.container2}>
                <Searchbar />
            </div>

        </nav>
    )
}

export default Navbar;