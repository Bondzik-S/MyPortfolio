import React from 'react';
import Btn from '../btn/btn';
import Company from '../company/company';
import Address from '../address/address';
import './card.css'

// Тут коли все закоментоване, не працює ніхуя, юзер не виводиться ЧОМУ?

export default function Card ({user})  {
    //console.log(user);
    const {address, company, email, name, phone, username, website} = user; // Деструктиризація
    return (
        <>
        
        
           <div className='card'>
            <div className='user-name'>
                <div>Імʼя Прізвище: {name}</div>
                <div>Логін: {username}</div>
            </div>
            <Company data = {company}></Company>
            <Address data = {address}></Address>
            <div className='contact'>
                <Btn type = 'email' icon = '💌' data = {email}></Btn> <br/>
                <Btn type = 'phone' icon = '📞' data = {phone}></Btn> <br/>
                <Btn type = 'website' icon = '🌏' data = {website}></Btn> <br/>
            </div>
            </div> 
        
        
        </>
        
    )
}

//export default Card;