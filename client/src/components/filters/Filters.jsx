import React from "react";
import style from './Filters.module.css';
import { getTeams, filterByTeam, filterByOrigin, sortByName, sortByDate } from "../../redux/actions/actions";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

const Filters = () => {

    const dispatch = useDispatch() ;
    const sortFiltersActive = useSelector( state => state.areDriversSorted);
    const teams = useSelector( state => state.allTeams);
    const [sortValue, setSortValue] = useState('');

    useEffect(() => {
        dispatch(getTeams())
    }, [])

    const sortDrivers = () => {
        if(sortFiltersActive.name)
            dispatch(sortByName(sortValue))
        if(sortFiltersActive.date)
            dispatch(sortByDate(sortValue))  
    }


    const onChangeTeam = (event) => {
        dispatch(filterByTeam(event.target.value)) 
        sortDrivers()
    }

    const onChangeOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value))
        sortDrivers()
    }

    const onChangeName = (event) => {
        const order = event.target.value;  
        setSortValue(order)
        dispatch(sortByName(order))
    } 

    const onChangeDate = (event) => {
        const date = event.target.value;
        setSortValue(date)
        dispatch(sortByDate(date))
    }

    const handleTeamClick = (event) => {
        if(event.target.value)
            event.target.value = '';
    }

    return (
        <div className={style.filters}>

            <div className={style.team}>
                <label htmlFor="team" className={style.title}>Team</label>
                <input list="team"  onChange={onChangeTeam} onClick={handleTeamClick}/>
                <datalist name="team" id="team">
                    <option value="All">All</option>
                    {
                        teams?.map( team => {
                            return <option key={team.name} value={team.name}>{team.name}</option>
                        })
                    }
                </datalist>            
            </div>

            <div className={style.origin}>
                <label htmlFor="origin" className={style.title}>Origin</label>
                <select name="origin" id="origin" onChange={onChangeOrigin}>
                    <option value="All">All</option>
                    <option value="bdd">Database</option>
                    <option value="api">API</option>
                </select>
            </div>

            <div className={style.order}>

                <p className={style.title}>Order</p>

                <div className={style.orders}>

                    <select name="name" id="name" onChange={onChangeName}>
                        <option value="random">Random name</option>
                        <option value="ascendingly">A-Z</option>
                        <option value="descendingly">Z-A</option>
                    </select>
                
                
                    <select name="dob" id="dob" onChange={onChangeDate}>
                        <option value="birth">Date of birth</option>
                        <option value="younger">Younger</option>
                        <option value="older">Older</option>
                    </select>
                    

                </div>
                

            </div>
        </div>
    )
}

export default Filters;