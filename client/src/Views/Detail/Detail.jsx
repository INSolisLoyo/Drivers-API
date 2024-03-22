import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDriver, resetDriver } from "../../redux/actions/actions";
import style from "./Detail.module.css";

const Detail = () => {
    
    const driver = useSelector( (state) => state.driver)
    
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDriver(id))

        return () => {
            dispatch(resetDriver());
        }

    }, [id, dispatch]);

    if (!driver) {
        return <div>Loading...</div>;
    }


    return (
        <div className={style.card}>
            <div className={style.cardContainer}>
                <div className={style.header}> 
                    <img src={driver.image} alt={driver.forname} />
                </div>
                <div className={style.body}>
                    <div className={style.main}>
                        <h1 className={style.title}>{driver.forname} {driver.surname}</h1>
                        <p className={style.content}><span>Description:</span> {driver.description}</p>

                        <div className={style.container1}>
                            <p><span>Id: </span>{driver.id}</p>
                            <p><span>Date of birth:</span> {driver.dob}</p>
                        </div>
                    </div>
                    <div className={style.divider}></div>
                    <div className={style.footer}>
                        <p><span>Nationality:</span> {driver.nationality}</p>
                        <p><span>Teams:</span> {driver.teams}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;