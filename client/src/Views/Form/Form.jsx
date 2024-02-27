import React from "react";
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getTeams, postNewDriver } from "../../redux/actions/actions";
import validate from "./validate";


const Form = () => {

    //creamos un estado para form
    const [form, setForm] = useState({
        forname: '',
        surname: '',
        nationality: '',
        description: '',
        image: '',
        dob: '',
        teams: []
    })

    //creamos un estado para manejar errores
    const [errors, setErrors] = useState({
        forname: '',
        surname: '',
        nationality: '',
        description: '',
        image: '',
        dob: '',
        teams: ''
    })
    const [showErrors, setShowErrors] = useState(false);

    //creamos un estado para ir almacenando los id de los Teams seleccionados
    const [selectedTeams, setSelectedTeams] = useState([]);
    //creamos un estado para ir almacenando los nombres de los Teams seleccionados
    // const [teamNames, setTeamNames] = useState([]);

    const dispatch = useDispatch();
    //inscribimos a la propiedad teams del estado global
    const teams = useSelector( (state) => state.allTeams)

    //cuando el componente se monte cargamos los teams
    useEffect( () => {
        dispatch(getTeams())
    }, [])

    //cada vez que haya un cambio en el estado form, validamos los input
    // useEffect( () => { validate(form, setErrors, errors) }, [form])

    const submitHandler = async (event) => {
        //evitamos que el form se recargue

        let errorsExist = false

        event.preventDefault();
        for (let prop in errors){
            if ( errors[prop] !== '') errorsExist = true;
        }

        if(errorsExist){
            setShowErrors(true)
        }else {
            try {//ejecutamos la action posNewDriver
                await postNewDriver(form)
            } catch (error) {//capturamos cualquier error
                console.error(error);
                throw error;
            }
        }
            
    }

    //construimos un manejador para seleccionar los teams
    const handleTeamsChange = (event) => {
        const team = event.target.value;
       
        if(team === 'team')
            return;
        //buscamos el id del team seleccionado
        const selectedTeam = teams.find(item => item.name === team);
        const teamId = selectedTeam.id;
        
        if(!form.teams.includes(teamId)){
            // setSelectedTeams({ ...selectedTeams, teamId })
            setForm({
                ...form,
                teams: [ ...form.teams, teamId ]
            })
            validate({ ...form, teams: [...form.teams, teamId]}, setErrors, errors)
            setSelectedTeams([...selectedTeams, selectedTeam])//añadimos el nombre
        }
    }

    const handleChange = (event) => {

        const property = event.target.name;
        const value = event.target.value;
        //actualizamos el estado en su respectiva propiedad
        setForm({
            ...form,
            [property]: value
        }) 

        validate({...form, [property]: value}, setErrors, errors)

    }

    const handleCLickTeam = (id) => {

        const newTeams = form.teams.filter( teamId => teamId !== id)
        setForm({
            ...form,
            teams: newTeams
        })

        const newSelectedTeams = selectedTeams.filter( team => team.id !== id)
        setSelectedTeams(newSelectedTeams);

        validate({
            ...form,
            teams: newTeams
        }, setErrors, errors)
    }

    const handleTeamsClick = (event) => {
        if(event.target.value)
            event.target.value = '';
    }

    return (
        <div className={style.main}>
            <h1 className={style.title}>NEW DRIVER</h1>
            <form onSubmit={submitHandler} className={style.form}>

                <label htmlFor="forname">First name</label>
                <input type="text" name="forname" id="forname" onChange={handleChange}/>
                { (showErrors && errors.forname) && <p className={style.error}>{errors.forname}</p>}

                <label htmlFor="surname">Last name</label>
                <input type="text" name="surname" id="surname" onChange={handleChange}/>
                { (showErrors && errors.surname) && <p className={style.error}>{errors.surname}</p>}

                <label htmlFor="nationality">Nationality</label>
                <input type="text" name="nationality" id="nationality" onChange={handleChange}/>
                { (showErrors && errors.nationality) && <p className={style.error}>{errors.nationality}</p>}

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={handleChange}/>
                { (showErrors && errors.description) && <p className={style.error}>{errors.description}</p>}

                <label htmlFor="image">Image link</label>
                <input type="text" name="image" id="image" onChange={handleChange}/>
                { (showErrors && errors.image) && <p className={style.error}>{errors.image}</p>}

                <label htmlFor="dob">Date of birth</label>
                <input type="date" name="dob" id="dob" onChange={handleChange}/>

                <label htmlFor="teams">Teams</label>
                <input list="teams" onChange={handleTeamsChange} onClick={handleTeamsClick}/>
                <datalist name="teams" id="teams" >
                
                   <option key={'team'} value="team">Team</option> 
                    {
                        teams?.map( (team) => {
                            return <option key={team.name} value={team.name}>{team.name}</option>
                        })
                    }
                </datalist>
                { (showErrors && errors.teams) && <p className={style.error}>{errors.teams}</p>}
                <div className={style.selectedTeams}>
                    { selectedTeams.length > 0 && selectedTeams.map( (team, index) => {
                        return <p key={index} className={style.selectedTeam}>{team.name} <span onClick={() => handleCLickTeam(team.id)}>x</span></p>
                    }
                    )} 
                </div>

                <button type="submit" className={style.create}>Create</button>
            </form>
        </div>
    )
}

export default Form;