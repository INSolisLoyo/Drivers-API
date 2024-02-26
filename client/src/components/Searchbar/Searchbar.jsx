import React from "react";
import style from './Searchbar.module.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { searchByName } from "../../redux/actions/actions";

const Searchbar = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const name = event.target.value;
        setName(name);
        if(!name)
            dispatch(searchByName(name))
    }

    const handleSearch = () =>{
        if(!name || !isNaN(name))
            setError('Please, enter a valid name')
        else {
            dispatch(searchByName(name))
        }
    }

    return (
        <div className={style.container}>
            <input type="text" placeholder="Driver" name="driver" value={name} onChange={handleChange} />
            <button className={style.btn} onClick={handleSearch}>Search</button>
        </div>
    )
}

export default Searchbar;