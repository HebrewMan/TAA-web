import React, {useState,  } from 'react';
import "./style/attribute.scss"
const Button = (props:any) => {


    return (
        <React.Fragment>
            {/* style={{top: `${props?.top||100}px` }} */}
            <div className='absolute relative attibute'  >
                Buy Now
            </div>
        </React.Fragment>
    )
}

export default Button;