import React from "react";
import Btn from "../btn/btn";

const Address = ({data}) => {
    return(
        <>
        <h2>{data.city}</h2>
        <div>Вул: {data.street} КВ: {data.suite}</div><br/>
        <Btn type = 'index' data = {data.zipcode} icon = '📇'></Btn> 
        </>
    )
}

export default Address;