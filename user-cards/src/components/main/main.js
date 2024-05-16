import React from 'react';
import {obj} from '../../data/data';
import Cards from '../cards/cards';

export default function Main() {
     return (
        <>
        <h1>Карточки користувачів</h1>
        <Cards data={obj}/>
        </>
    )
}