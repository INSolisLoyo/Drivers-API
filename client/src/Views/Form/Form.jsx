import React from "react";
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getTeams, postNewDriver } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { validate, validateTeams} from "./validate";


const Form = () => {

    const navigate = useNavigate();

    const [ desabledButton, setDesabledButton ] = useState(true);

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
        description: '',
        image: '',
        dob: '',
        teams: ''
    })

    const [selectedTeams, setSelectedTeams] = useState([]);
    

    const dispatch = useDispatch();

    const teams = useSelector( (state) => state.allTeams)

    useEffect( () => {
        dispatch(getTeams())
    }, [])

    useEffect( () =>{

        let errorsExist = false
        let formCompleted = true;
        
        for (let prop in errors){
            if ( errors[prop] !== '') errorsExist = true;
        }

        for (let prop in form){
            if( form[prop] === '') formCompleted = false;
        }

        if(!errorsExist && formCompleted){
            setDesabledButton(false)
        }

    }, [form])


    const submitHandler = async (event) => {

        event.preventDefault();

        try {//ejecutamos la action posNewDriver
            await postNewDriver(form)
        } catch (error) {//capturamos cualquier error
            console.error(error);
            throw error;
        }
                 
    }

    const handleTeamsChange = (event) => {

        const team = event.target.value;
       
        if(team === 'team')
            return;
        
        const selectedTeam = teams.find(item => item.name === team);
        const teamId = selectedTeam.id;
        
        if(!form.teams.includes(teamId)){

            setForm({
                ...form,
                teams: [ ...form.teams, teamId ]
            })

            validateTeams({ ...form, teams: [...form.teams, teamId]}, errors, setErrors)
            setSelectedTeams([...selectedTeams, selectedTeam])

        }

    }

    const handleChange = (event) => {

        const property = event.target.name;
        const value = event.target.value;

        setForm({
            ...form,
            [property]: value
        })   

        validate(property, value, errors, setErrors)

    }

    const handleCLickTeam =  (id) => {

        const newTeams =  form.teams.filter( teamId => teamId !== id)
        setForm({
            ...form,
            teams: newTeams
        })

        const newSelectedTeams = selectedTeams.filter( team => team.id !== id)
        setSelectedTeams(newSelectedTeams);

        validateTeams({
            ...form,
            teams: newTeams
        }, errors, setErrors)
        
    }

    const handleTeamsClick = (event) => {
        if(event.target.value)
            event.target.value = '';
    }

    const handleBackClick = () => {
        navigate(-1);
    }

    return (
        <div className={style.main}>
            <div className={style.header}>
                <button onClick={handleBackClick}>Back</button>
                <h1 className={style.title}>NEW DRIVER</h1>
            </div>
            <form onSubmit={submitHandler} className={style.form}>

                <label htmlFor="forname">First name</label>
                <input type="text" name="forname" id="forname" onChange={handleChange}/>
                { errors.forname && <p className={style.error}>{errors.forname}</p>}

                <label htmlFor="surname">Last name</label>
                <input type="text" name="surname" id="surname" onChange={handleChange}/>
                { errors.surname && <p className={style.error}>{errors.surname}</p>}

                <label htmlFor="nationality">Nationality</label>
                <input type="text" name="nationality" id="nationality" onChange={handleChange}/>
                { errors.nationality && <p className={style.error}>{errors.nationality}</p>}

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={handleChange}/>
                { errors.description && <p className={style.error}>{errors.description}</p>}

                <label htmlFor="image">Image link</label>
                <input type="text" name="image" id="image" onChange={handleChange}/>
                { errors.image && <p className={style.error}>{errors.image}</p>}

                <label htmlFor="dob">Date of birth</label>
                <input type="date" name="dob" id="dob" onChange={handleChange}/>
                { errors.dob && <p className={style.error}>{errors.dob}</p>}


                <label htmlFor="teams">Teams</label>
                <input list="teams" onChange={handleTeamsChange} onClick={handleTeamsClick} />
                <datalist name="teams" id="teams" >
                 
                   <option key={'team'} value="team">Team</option> 
                    {
                        teams?.map( (team) => {
                            return <option key={team.name} value={team.name}>{team.name}</option>
                        })
                    }
                </datalist>
                { errors.teams && <p className={style.error}>{errors.teams}</p>}
                <div className={style.selectedTeams}>
                    { selectedTeams.length > 0 && selectedTeams.map( (team, index) => {
                        return <p key={index} className={style.selectedTeam}>{team.name} <span onClick={() => handleCLickTeam(team.id)}>x</span></p>
                    }
                    )} 
                </div>

                <button type="submit" className={style.create} disabled={desabledButton}>Create</button>
            </form>
        </div>
    )
}

export default Form;