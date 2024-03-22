import React, { useEffect, useState}from 'react';
import { setPage } from '../../redux/actions/actions';
import style from './PagesButtons.module.css';
import { useSelector, useDispatch } from 'react-redux';

const BUTTONSPERPAGE = 5;

const PagesButtons = () => { 

    
    const dispatch = useDispatch();
    const filteredDrivers = useSelector(state => state.filteredDrivers);
    const pagesNumber = useSelector(state => state.pagesNumber);
    const [ currentButtonsPage, setCurrentButtonsPage ] = useState(0);

    useEffect( () => {
        dispatch(setPage(1))
        setCurrentButtonsPage(0);
    }, [filteredDrivers])
    
    useEffect( () => {}, 
        [currentButtonsPage])

    const buttonsPagesNumber =  Math.ceil(pagesNumber / BUTTONSPERPAGE);
    const startIndex = Math.floor(currentButtonsPage * BUTTONSPERPAGE)
    const finalIndex = (startIndex + BUTTONSPERPAGE > pagesNumber ) ? pagesNumber : startIndex + BUTTONSPERPAGE;

    const currentButtons = [];
    
    for(let i = startIndex; i < finalIndex; i++){
        currentButtons.push(i);
    }

    const handleLarrButton = () => {
        
        if(currentButtonsPage > 0){
            setCurrentButtonsPage(currentButtonsPage-1);
        }

    }


    const handleButton = (pageNumber) => {
        dispatch(setPage(pageNumber))
    }

    const handleRarrButton = () => {

        if(currentButtonsPage < buttonsPagesNumber - 1){
            setCurrentButtonsPage(currentButtonsPage+1);
        }

    }

    const handleFirstPage = () => {
        setCurrentButtonsPage(0);
    }
    
    const handleLastPage = () => {
        setCurrentButtonsPage(buttonsPagesNumber - 1);
    }
    
    return (

        <div className={style.buttonContainer}>
            <button onClick={() => handleFirstPage()} className={style.firstPage}>&#x25C0;</button>
            <button onClick={() => handleLarrButton()} className={style.btnLeft}>&larr;</button>
            {
                currentButtons.map(button => (
                    <button key={button} onClick={() => handleButton(button + 1)} className={style.btnPage}>{button + 1}</button>
                ))
            }
            <button onClick={() => handleRarrButton()} className={style.btnRight}>&rarr;</button>
            <button onClick={() => handleLastPage()} className={style.lastPage}>&#x25B6;</button>
        </div>

    )
}

export default PagesButtons; 