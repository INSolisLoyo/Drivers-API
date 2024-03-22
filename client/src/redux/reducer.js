import { 
    FILTER_BY_ORIGIN, 
    FILTER_BY_TEAM, 
    GET_DRIVER, 
    GET_DRIVERS, 
    GET_TEAMS, 
    SET_PAGE,
    RESET_DETAIL ,
    SEARCH_BY_NAME,
    SORT_BY_DATE,
    SORT_BY_NAME
} from "./actions/action-types";

const CARDSNUMBER = 9;

const initialState = {
    allDrivers: [],
    renderedCards: [],
    pagesNumber: [],
    page: 1,
    filteredDrivers: [],
    filteredDriversCopy: [],
    driversByTeam: [],
    driversByOrigin: [],
    areDriversSorted: {
        name: false,
        date: false
    },
    isByTeamActive: false,
    isByOriginActive: false,
    driver: {},
    allTeams: []
};

const rootReducer = (state = initialState, { type, payload}) => {
    switch(type){
        case GET_DRIVERS:

            let driversCopy; 

            if(state.filteredDrivers.length > 0)
                driversCopy =  [...state.filteredDrivers];
            else 
                driversCopy = [ ...payload ]

            return {
                ...state,
                allDrivers: payload,
                filteredDrivers: driversCopy
            }

        case GET_DRIVER:
            return {
                ...state,
                driver: payload
            }
        case RESET_DETAIL:
            return {
                ...state,
                driver: payload
            }
        case GET_TEAMS:
            return {
                ...state,
                allTeams: payload
            }
        case FILTER_BY_TEAM:

            if (payload === 'All') {

                if(state.driversByOrigin.length > 0){

                    return {
                        ...state,
                        filteredDrivers: [...state.driversByOrigin],
                        filteredDriversCopy: [...state.driversByOrigin],
                        driversByTeam: [],
                        isByTeamActive: false
                    }

                } else {

                    return {
                        ...state,
                        filteredDrivers: [...state.allDrivers],
                        filteredDriversCopy: [...state.allDrivers],
                        driversByTeam: [],
                        isByTeamActive: false
                    }
                }
                
            } else {

                //Ejecutamos el filtro
                const driversByTeam = state.allDrivers.filter( driver => driver.teams?.toLowerCase().includes(payload.toLowerCase().replace(/–/g, '-')))

                if( state.driversByOrigin.length > 0) {
                    
                    const drivers = state.driversByOrigin.filter( driverOrigin => driversByTeam.some( driverTeam => driverOrigin.id === driverTeam.id));
    
                    return {
                        ...state,
                        filteredDrivers: drivers,
                        filteredDriversCopy: drivers,
                        driversByTeam: driversByTeam,
                        isByTeamActive: true
                    }

                } else {

                    if(!state.isByOriginActive){

                        return {
                            ...state,
                            filteredDrivers: driversByTeam,
                            filteredDriversCopy: driversByTeam,
                            driversByTeam: driversByTeam,
                            isByTeamActive: true
                        }

                    } else {

                        return {
                            ...state,
                            filteredDriversCopy: driversByTeam,
                            driversByTeam: driversByTeam,
                            isByTeamActive: true
                        }

                    }

                }
        
            }
            
        case FILTER_BY_ORIGIN:

            if (payload === 'All') {

                if(state.driversByTeam.length > 0){

                    return {
                        ...state,
                        filteredDrivers: [...state.driversByTeam],
                        filteredDriversCopy: [...state.driversByTeam],
                        driverOrigin: [],
                        isByOriginActive: false
                    }

                } else {

                    return {
                        ...state,
                        filteredDrivers: [...state.allDrivers],
                        filteredDriversCopy: [...state.allDrivers],
                        driverOrigin: [],
                        isByOriginActive: false
                    }

                }

            } else {

                // Aplicamos el filtro
                const driversByOrigin = state.allDrivers.filter(driver => {
                    if (payload === 'api') {
                        return !isNaN(driver.id);
                    } else {
                        return isNaN(driver.id);
                    }
                });

                
                if( state.driversByTeam.length > 0){

                    const drivers = state.driversByTeam.filter( (driverTeam) => driversByOrigin.some( (driverOrigin) => driverTeam.id === driverOrigin.id)) 

                    return {
                        ...state,
                        filteredDrivers: drivers,
                        filteredDriversCopy: drivers,
                        driversByOrigin: driversByOrigin,
                        isByOriginActive: true
                    }

                }
                else {

                    if( !state.isByTeamActive ){

                        return {
                            ...state,
                            filteredDrivers: driversByOrigin,
                            filteredDriversCopy: driversByOrigin,
                            driversByOrigin: driversByOrigin,
                            isByOriginActive: true
                        }

                    }

                }

             
            }
        case SORT_BY_NAME:
            if (payload === 'random') {
                return {
                    ...state,
                    filteredDrivers: [...state.filteredDriversCopy],
                    areDriversSorted: {
                        ...state.areDriversSorted,
                        name: false 
                    }
                };
            } else {

                const sortedDrivers = [...state.filteredDrivers].sort((a, b) => {
                    const nameA = a.forname + a.surname;
                    const nameB = b.forname + b.surname;
                    if (payload === 'ascendingly') {
                        return nameA.localeCompare(nameB);
                    } else {
                        return nameB.localeCompare(nameA);
                    }
                });

                return {
                    ...state,
                    filteredDrivers: sortedDrivers,
                    areDriversSorted: {
                        name: true,
                        date: false
                    }
                };

            }    
        case SORT_BY_DATE:
            if (payload === 'birth') {
                return {
                    ...state,
                    filteredDrivers: [...state.filteredDriversCopy],
                    areDriversSorted: {
                        ...state.areDriversSorted,
                        date: false
                    }
                };
            } else {
                const sortedDrivers = [...state.filteredDrivers].sort((a, b) => {
                    const dobA = new Date(a.dob);
                    const dobB = new Date(b.dob);
                    if (payload === 'older') {
                        return dobA - dobB;
                    } else {
                        return dobB - dobA;
                    }
                });
                return {
                    ...state,
                    filteredDrivers: sortedDrivers,
                    areDriversSorted: {
                        name: false,
                        date: true
                    }
                };
            }
        case SEARCH_BY_NAME:
            if(payload.length === 0){
                return {
                    ...state,
                    filteredDrivers: [...state.allDrivers]
                }
            } else {
                return {
                    ...state,
                    filteredDrivers: [...payload]
                }
            }    
        case SET_PAGE:

            let cards;
            const pagesNumber = Math.ceil(state.filteredDrivers.length/CARDSNUMBER);

            if(payload > pagesNumber) payload = 1;   

            if(payload < pagesNumber ){
                const firstCard = (payload - 1) * CARDSNUMBER;
                const lastCard = payload * CARDSNUMBER;
                cards = state.filteredDrivers.slice(firstCard, lastCard)
            } else{
                const firstCard = (payload - 1) * CARDSNUMBER;
                const lastCard = state.filteredDrivers.length;
                cards = state.filteredDrivers.slice(firstCard, lastCard)
                if(state.filteredDrivers.length === 1)
                    cards = state.filteredDrivers
            }
                
            return {
                ...state,
                renderedCards: cards,
                pagesNumber: pagesNumber,
                page: payload
            }


        default:    
            return { ...state };
    }
}

export default rootReducer;