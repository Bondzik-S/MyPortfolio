import React from 'react';

const Company = ({data}) => {
    return(
        <div className='company'>
            <h2>{data.name}</h2>
        </div>
    )
}

export default Company;