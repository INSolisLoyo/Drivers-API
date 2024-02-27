const validate = (form, setErrors, errors) => {

    const newErrors = { ...errors };

    if(!form.forname)
        newErrors.forname = 'Firstname can\'t be empty'
    else if(!/^[a-zA-Z]*$/.test(form.forname)){
        newErrors.forname = 'Only enter letters'
    } else {
        newErrors.forname = ''
    }

    if(!form.surname)
        newErrors.surname = 'Lastname can\'t be empty'
    else if(!/^[a-zA-Z]*$/.test(form.surname)){
        newErrors.surname= 'Only enter letters'
    } else {
        newErrors.surname = ''
    }

    if(!form.nationality)
        newErrors.nationality = 'Nationality can\'t be empty'
    else if(!/^[a-zA-Z]*$/.test(form.nationality)){
        newErrors.nationality = 'Only enter letters'
    } else {
        newErrors.nationality = ''
    }

    if(!form.description)
        newErrors.description = 'Description can\'t be empty'
    else newErrors.description = '';

    if(!form.image){
        newErrors.image = 'Image link can\'t be empty'
    }
    else if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(form.image)) {
        newErrors.image = 'Provide a valid link'
    } else {
        newErrors.image = ''
    }         

    if(form.teams.length === 0){
        newErrors.teams = 'Choose at least one Team'
    } else {
        newErrors.teams = ''
    }

    setErrors(newErrors)

}

export default validate;