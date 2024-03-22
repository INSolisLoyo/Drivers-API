
export const validate = (data, value, errors, setErrors) => {

    const newErrors = { ...errors };

    switch(data){
        case 'forname':
            if(value.length === 0){
                newErrors.forname = 'Can\'t be empty'
            } else {
                if(value.length > 20){
                    newErrors.forname = 'The length can\'t be longer than 20'
                } else {
                    if(!/^[a-zA-Z\s]+$/.test(value)){
                        newErrors.forname = 'Only enter letters'
                    } else {
                        newErrors.forname = ''
                    }
                }
            }       
            break;
        case 'surname':
            if(value.length === 0){
                newErrors.surname = 'Can\'t be empty'
            } else {
                if(value.length > 20){
                    newErrors.surname = 'The length can\'t be longer than 20'
                } else {
                    if(!/^[a-zA-Z\s]+$/.test(value)){
                        newErrors.surname= 'Only enter letters'
                    } else {
                        newErrors.surname = ''
                    }
                }
            }
            break;
        case 'nationality':
            if(value.length === 0){
                newErrors.nationality = 'Can\'t be empty'
            } else {
                if(!/^[a-zA-Z]*$/.test(value)){
                    newErrors.nationality = 'Only enter letters'
                } else {
                    newErrors.nationality = ''
                }
            }
            break;
        case 'description':
            if(value.length === 0){
                newErrors.description = 'Can\'t be empty'
            } else {
                newErrors.description = ''
            }
            break;
        case 'image':
            if(value.length === 0){
                newErrors.image = 'Can\'t be empty'
            } else {
                if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)) {
                    newErrors.image = 'Provide a valid link'
                } else {
                    newErrors.image = ''
                }    
            }
            break;
        case 'dob':
            if(value.length === 0){
                newErrors.dob = 'Can\'t be empty'
            } else {
                newErrors.dob = ''
            }
            break;
        default:
            break;     
    } 

    setErrors(newErrors)

}

export const validateTeams = (form, errors, setErrors) => {
    
    const newErrors = { ...errors };
    
    if(form.teams.length === 0){
        newErrors.teams = 'Choose at least one team'
    }
    else {
        newErrors.teams = ''
    }

    setErrors(newErrors)
}

