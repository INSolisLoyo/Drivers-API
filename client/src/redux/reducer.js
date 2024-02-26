import { 
    FILTER_BY_ORIGIN, 
    FILTER_BY_TEAM, 
    GET_DRIVER, 
    GET_DRIVERS, 
    GET_TEAMS, 
    PAGINATION, 
    RESET_DETAIL ,
    SEARCH_BY_NAME,
    SORT_BY_DATE,
    SORT_BY_NAME
} from "./actions/action-types";

const initialState = {
    allDrivers: [],
    renderedCards: [],
    pagesNumber: [],
    filteredDrivers: [],
    driversAuxCopy: [],
    isAnyFilterActive: {
        team: false,
        origin: false
    },
    driver: [],
    allTeams: []
};

const rootReducer = (state = initialState, { type, payload}) => {
    switch(type){
        case GET_DRIVERS:
            return {
                ...state,
                allDrivers: payload,
                filteredDrivers: payload
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
                // Desactivar el filtro de equipo y restablecer los resultados filtrados a todos los conductores
                return {
                    ...state,
                    isAnyFilterActive: {
                        ...state.isAnyFilterActive,
                        team: false
                    },
                    filteredDrivers: [...state.allDrivers]
                };
            } else {
                // Aplicar el filtro de equipo sobre los resultados filtrados actuales
                const driversByTeam = state.allDrivers.filter(driver => driver.teams?.toLowerCase().includes(payload.toLowerCase().replace(/–/g, '-')));
                return {
                    ...state,
                    isAnyFilterActive: {
                        ...state.isAnyFilterActive,
                        team: true
                    },
                    filteredDrivers: driversByTeam
                };
            }
            
        case FILTER_BY_ORIGIN:
            if (payload === 'All') {
                // Desactivar el filtro de origen y restablecer los resultados filtrados a todos los conductores
                return {
                    ...state,
                    isAnyFilterActive: {
                        ...state.isAnyFilterActive,
                        origin: false
                    },
                    filteredDrivers: [...state.allDrivers]
                };
            } else {
                // Aplicar el filtro de origen sobre los resultados filtrados actuales
                const driversByOrigin = state.allDrivers.filter(driver => {
                    if (payload === 'api') {
                        return !isNaN(driver.id);
                    } else {
                        return isNaN(driver.id);
                    }
                });
                return {
                    ...state,
                    isAnyFilterActive: {
                        ...state.isAnyFilterActive,
                        origin: true
                    },
                    filteredDrivers: driversByOrigin
                };
            }
        case SORT_BY_NAME:
            if (payload === 'random') {
                return {
                    ...state,
                    filteredDrivers: [...state.allDrivers]
                };
            } else {
                const sortedDrivers = [...state.allDrivers].sort((a, b) => {
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
                    filteredDrivers: sortedDrivers
                };
            }    
        case SORT_BY_DATE:
            if (payload === 'birth') {
                return {
                    ...state,
                    filteredDrivers: [...state.allDrivers]
                };
            } else {
                const sortedDrivers = [...state.allDrivers].sort((a, b) => {
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
                    filteredDrivers: sortedDrivers
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
                    filteredDrivers: payload
                }
            }    
        case PAGINATION:
            let cards;
            const pagesNumber = Math.ceil(state.filteredDrivers.length/9);
            if(payload < pagesNumber ){
                const firstCard = (payload - 1) * 9;
                const lastCard = payload * 9;
                cards = state.filteredDrivers.slice(firstCard, lastCard)
            } else{
                const firstCard = (payload - 1) * 9;
                const lastCard = state.filteredDrivers.length - 1;
                cards = state.filteredDrivers.slice(firstCard, lastCard)
                if(state.filteredDrivers.length === 1)
                    cards = state.filteredDrivers
            }
                
            return {
                ...state,
                renderedCards: cards,
                pagesNumber: pagesNumber
            }

        default:    
            return { ...state };
    }
}

export default rootReducer;