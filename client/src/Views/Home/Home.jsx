import React from "react";
import Cards from "../../components/Cards/Cards";
import Filters from "../../components/filters/Filters";
import style from './Home.module.css';

const Home = () => {
    return (
        <div className={style.container}>
           <Filters/>
           <Cards/>
        </div>
    )
}
 
export default Home;