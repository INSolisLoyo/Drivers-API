import React from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDrivers, pagination } from "../../redux/actions/actions";
import style from './Cards.module.css';

const Cards = () => {

    const dispatch = useDispatch();
    const filteredDrivers = useSelector( state => state.filteredDrivers);
    const renderedCards = useSelector( state => state.renderedCards);
    const pagesNumber = useSelector( state => state.pagesNumber);
    const [page, setPage] = useState(1);
    // const [ drivers, setDrivers] = useState([])

    useEffect(() => {
       dispatch(getDrivers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(pagination(page))
    }, [dispatch, page, filteredDrivers])

    // useEffect(() => {
    //     // Verifica si filteredDrivers ha cambiado antes de actualizar el estado
    //     if (JSON.stringify(filteredDrivers) !== JSON.stringify(drivers)) {
    //         setDrivers(renderedCards);
    //     }
    // }, [filteredDrivers])

    const handleButton = (pageNumber) => {
        setPage(pageNumber)
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.cards}>
                {
                    renderedCards?.map((driver) => {
                        return <Card
                                key={driver.id}
                                id={driver.id}
                                image={driver.image}
                                forname={driver.forname}
                                surname={driver.surname}
                                teams={driver?.teams}
                            />
                    })
                }
            </div>
            <div className={style.pages}>
            {
                [...Array(pagesNumber)].map((_, index) => (
                    <button key={index} className={style.page} onClick={() => handleButton(index+1)}>{index + 1}</button>
                ))
            }
            </div>
        </div>
    )
}

export default Cards;