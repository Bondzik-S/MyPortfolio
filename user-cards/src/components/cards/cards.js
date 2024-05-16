import React from 'react';
import Card from '../card/card';

function Cards ({data}){
    //console.log(data);
    return(
        <div className='cards'>
        {
            
            data.map((element) => {
                return <Card user = {element} key = {element.id}> </Card>
            })
            
        }
        </div>
    )
}

export default Cards;