import React from 'react';

function Btn ({type, icon, data}) {
    return(
        <>
        {
            type === 'email' ?
            <a href={`mailto:${data}`} className='btn'><span>{icon} {data}</span></a> :
            type === 'phone' ?
            <a href={`tel:${data}`} className='btn'><span>{icon} {data}</span></a> :
            type === 'website' ?
            <a href={data} className='btn'><span>{icon} {data}</span></a> :
            type === 'index' ?
            <a href={'https://index.ukrposhta.ua/find-post-index'} className='btn'><span>{icon} {data}</span></a> : 
            null
        }
        </>
        //<a href='' className='btn'></a>
    )
}

export default Btn;