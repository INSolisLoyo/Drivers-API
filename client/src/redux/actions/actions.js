import axios from 'axios';
import { GET_DRIVERS, GET_DRIVER, RESET_DETAIL, GET_TEAMS, FILTER_BY_TEAM, FILTER_BY_ORIGIN, SORT_BY_NAME, SORT_BY_DATE, SEARCH_BY_NAME, PAGINATION } from "./action-types";

const URL = 'http://localhost:3001';

export const getDrivers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}/drivers`);
            return dispatch({ type: GET_DRIVERS, payload: data });
        } catch (error) {
            console.error('Error al obtener conductores:', error);
            // Puedes devolver una acción de error si lo deseas
        }
    };
};

export const getDriver = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}/drivers/${id}`);
            return dispatch({ type: GET_DRIVER, payload: data });
        } catch (error) {
            console.error(`Error al obtener el conductor con ID ${id}:`, error);
            // Puedes devolver una acción de error si lo deseas
        }
    };
};

export const resetDriver =  () =>  { return { type: RESET_DETAIL, payload: [] } };

export const getTeams = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}/teams`);
            data.sort( (a, b) => {
                const nameA = a.name;
                const nameB = b.name;
                return nameA.localeCompare(nameB);
            })
            return dispatch({ type: GET_TEAMS, payload: data})
        } catch (error) {
            console.error(error)
        }
    }
}

export const filterByTeam = (team) => {
    return async (dispatch) => {
        try {
            return dispatch({ type: FILTER_BY_TEAM, payload: team})
        } catch (error) {
            console.error(error)
        }
    }
}

export const filterByOrigin = (origin) => {
    return async (dispatch) => {
        try {
            return dispatch({ type: FILTER_BY_ORIGIN, payload: origin})
        } catch (error) {
            console.error(error)
        }
    }
}

export const sortByName = (age) => {
    return async (dispatch) => {
        try {
            return dispatch({ type: SORT_BY_NAME, payload: age})
        } catch (error) {
            console.error(error)
        }
    }
}
       

export const sortByDate = (date) => {
    return async (dispatch) => {
        try {
            return dispatch({ type: SORT_BY_DATE, payload: date})
        } catch (error) {
            console.error(error);
        }
    }
}

export const searchByName = (name) => {
    return async (dispatch) => {
        try {
            let drivers = []
            if(name)
                drivers = (await axios.get(`${URL}/drivers/?name=${name}`)).data;
            return dispatch({ type: SEARCH_BY_NAME, payload: drivers})       
        } catch (error) {
            console.error(error);
        }
    }
}

export const postNewDriver = async (driver) => {
    try {
        await axios.post(`${URL}/drivers`, driver)
        window.alert('Driver created')
    } catch (error) {
        console.error(error);
    }
}

export const pagination =  (pageNumber) => {
    return async (dispatch) => {
        try {
            return dispatch({ type: PAGINATION, payload: pageNumber})
        } catch (error) {
            console.error(error);
        }
    }
}