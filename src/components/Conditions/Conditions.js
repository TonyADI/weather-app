import React from 'react';
import './Conditions.css'
const conditions = (props) => {
    
    return(
        <div className="wrapper">
            {props.error && <small className="small">Please enter a valid city.</small>}
            {props.loading && <div className="loading">Loading...</div>}
            {props.responseObj.cod === 200 ?
               <div>
               </div>
           : null
           }
       </div>
    )
}

export default conditions;