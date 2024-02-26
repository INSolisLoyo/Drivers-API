import React from "react";
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ id, image, forname, surname, teams}) => {
    return (
        <Link to={`/detail/${id}`} className={style.card}>
            <img src={image} alt={forname} />
            <div className={style.content}>
                <p className={style.name}> {forname} {surname} </p>
                <p className={style.teams}>Teams: {teams}</p>
            </div>
        </Link>
    )
}

export default Card;