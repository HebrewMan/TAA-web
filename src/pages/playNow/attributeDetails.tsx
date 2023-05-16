import React, {useState,  } from 'react';

import "./index.scss"
// import '../../assets/cat/cat1.png'
const AttibuteDetails = (props:any) => {
  
    const height:any = document.getElementsByClassName('attibute-details-box');
    
    return (
        <React.Fragment>
            <div className='attibute-details-box'>
                <div className='main'>
                    <div className="title font-shadow-black">Cat Detail</div>
                </div>
                <div className="attibutes">222222222</div>
            </div>
        </React.Fragment>
    )
}

export default AttibuteDetails;