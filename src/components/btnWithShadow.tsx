import React, {useState, } from 'react';
import "./style/btn.scss"
const BtnWithShadow = (props:any) => {

    return (
        <React.Fragment>
              <div className='outer-ring' style={{background: `${props.item.outerColor}`,height:`${props.item.height}px`,width:`${props.item.width}px`}}>
                    <div className="btn-shadow font-shadow-black"
                     style={{background:`${props.item.shadowColor}`,fontSize:`${props.item.font}`,height:`${props.item.height-6}px`}}>
                       {props.item.logo&&  <img src={props.item.logo} width={20} height={20} alt="" />} {props.item.text}
                    </div>
                </div>
        </React.Fragment>
    )
}

export default BtnWithShadow;