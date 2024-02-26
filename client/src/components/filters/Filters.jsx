import React from "react";
import style from './Filters.module.css';
import { getTeams, filterByTeam, filterByOrigin, sortByName, sortByDate } from "../../redux/actions/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

const Filters = () => {

    const dispatch = useDispatch() ;
    const teams = useSelector( state => state.allTeams);

    useEffect(() => {
        dispatch(getTeams())
    }, [])

    const onChangeTeam = (event) => {
        dispatch(filterByTeam(event.target.value))
    }

    const onChangeOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value))
    }

    const onChangeName = (event) => {
        dispatch(sortByName(event.target.value))
    } 

    const onChangeDate = (event) => {
        dispatch(sortByDate(event.target.value))
    }

    return (
        <div className={style.filters}>

            <div className={style.team}>
                <label htmlFor="team" className={style.title}>Team</label>
                <select name="team" id="team" onChange={onChangeTeam}>
                    <option value="All">All</option>
                    {
                        teams?.map( team => {
                            return <option key={team.name} value={team.name}>{team.name}</option>
                        })
                    }
                </select>            
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