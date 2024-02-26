import React from "react";
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getTeams, postNewDriver } from "../../redux/actions/actions";

const validate = (form, setErrors, errors) => {
    if(!form.forname)
        setErrors({ ...errors, forname: 'Cant be empty'})
    else {
        if(/^[A-Za-z\s]+$/.test(form.forname))
            setErrors({ ...errors, forname: 'Only enter letters'})
    }
    if(!form.surname)
        setErrors({ ...errors, surname: 'Cant be empty'})
    else {
        if(/^[A-Za-z\s]+$/.test(form.surname))
            setErrors({ ...errors, surname: 'Only enter letters'})
    }
    if(!form.nationality)
        setErrors({ ...errors, nationality: 'Cant be empty'})
    else {
        if(/^[A-Za-z\s]+$/.test(form.nationality))
            setErrors({ ...errors, nationality: 'Only enter letters'})
    }
}

const Form = () => {

    const [form, setForm] = useState({
        forname: '',
        surname: '',
        nationality: '',
        description: '',
        image: '',
        dob: '',
        teams: []
    })

    const [errors, setErrors] = useState({
        forname: '',
        surname: '',
        nationality: '',
        image: '',
        dob: ''
    })

    const [selectedTeams, setSelectedTeams] = useState([]);
    const [teamNames, setTeamNames] = useState([]);

    const dispatch = useDispatch();
    const teams = useSelector( (state) => state.allTeams)

    useEffect( () => {
        dispatch(getTeams())
    }, [])

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            await postNewDriver({...form, teams: selectedTeams})
        } catch (error) {
            console.error(error);
        }
    }

    const handleTeamsChange = (event) => {
        const team = event.target.value;
        if(team === 'team')
            return;
        const teamId = teams.find(item => item.name === team)?.id;
        if(!selectedTeams.includes(teamId)){
            setSelectedTeams([...selectedTeams, teamId])
            setTeamNames([...teamNames, team])
        }
    }

    const handleFormData = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        }) 

        validate({...form, [name]: value}, setErrors, errors)
    }

    return (
        <div className={style.main}>
            <h1 className={style.title}>NEW DRIVER</h1>
            <form onSubmit={submitHandler} className={style.form}>

                <label htmlFor="forname">First name</label>
                <input type="text" name="forname" id="forname" onChange={handleFormData}/>

                <label htmlFor="surname">Last name</label>
                <input type="text" name="surname" id="surname" onChange={handleFormData}/>

                <label htmlFor="nationality">Nationality</label>
                <input type="text" name="nationality" id="nationality" onChange={handleFormData}/>

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={handleFormData}/>

                <label htmlFor="image">Image link:</label>
                <input type="text" name="image" id="image" onChange={handleFormData}/>

                <label htmlFor="dob">Date of birth</label>
                <input type="text" name="dob" id="dob" onChange={handleFormData}/>

                <label htmlFor="teams">Teams</label>
                <select name="teams" id="teams" onChange={handleTeamsChange}>
                
                   <option key={'team'} value="team">Team</option> 
                    {
                        teams?.map( (team) => {
                            return <option key={team.name} value={team.name}>{team.name}</option>
                        })
                    }
                </select>

                <button className={style.create}>Create</button>
            </form>
        </div>
    )
}

export default Form;