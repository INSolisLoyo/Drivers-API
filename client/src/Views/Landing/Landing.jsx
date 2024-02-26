import style from './Landing.module.css';
import React from "react";
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className={style.background} >
            <div className={style.overlay}>
                <div className={style.content}>
                    <h1><span>SPEED</span> PILOTS</h1>
                    <div className={style.line}></div>
                    <div className={style.paragraphs}>
                        <p>Welcome! This application allows you to explore profiles of standout pilots.</p>
                        <p>Built with: </p>
                        <p> <span>React</span> ·  <span>Redux</span> · <span>Node</span> · <span>Express</span> · <span>Sequelize</span> · <span>Postgres</span>.</p>
                    </div>
                   <Link to='/home'>
                    <button className={style.btn}>Go!</button>
                   </Link> 
                </div>
            </div>
        </div>
    )
}

export default Landing;