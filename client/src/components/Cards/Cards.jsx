import React from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDrivers } from "../../redux/actions/actions";
import style from './Cards.module.css';
import PagesButtons from "../PagesButtons/PagesButtons";

const Cards = () => {

    const dispatch = useDispatch();
    // const filteredDrivers = useSelector( state => state.filteredDrivers);
    const renderedCards = useSelector( state => state.renderedCards);
    const page = useSelector( state => state.page);
    // const pagesNumber = useSelector( state => state.pagesNumber);
    // const [page, setPage] = useState(1);

    useEffect(() => {
       dispatch(getDrivers());
    }, [dispatch]);

    useEffect( () => {

    }, [page])

    return (
        <div className={style.mainContainer}>
            <div className={style.cards}>
                {
                    renderedCards.length === 0 ? <h1>No hay resultados</h1> :
                    renderedCards?.map((driver) => {
                        return <Card
                                key={driver.id}
                                id={driver.id}
                                image={driver.image}
                                forname={driver.forname}
                                surname={driver.surname}
                                teams={driver?.teams}
                            />
                    })
                }
            </div>
            
            <PagesButtons/>
            
        </div>
    )
}

export default Cards;