import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDriver, resetDriver } from "../../redux/actions/actions";

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

    // Verificar si driver está definido
    if (!driver) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <div>
                <img src={driver.image} alt={driver.forname} />
            </div>
            <div>
                <h1>{driver.forname} {driver.surname}</h1>
                <p>Id: {driver.id}</p>
                <p>Nationality: {driver.nationality}</p>
                <p>Date of birth: {driver.dob}</p>
                <p>Teams: {driver.teams}</p>
                <p>Description: {driver.description}</p>
            </div>
        </div>
    )
}

export default Detail;