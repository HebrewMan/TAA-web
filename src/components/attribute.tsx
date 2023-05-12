import React, {useState,  } from 'react';
import "./style/attribute.scss"
// import '../../assets/cat/cat1.png'
const Attibute = (props:any) => {


    const [fkBkUrl, setFkBkUrl] = useState('../../src/assets/icon/fkbk.png'); 

    return (
        <React.Fragment>
            <div className='absolute relative attibute' style={{top: `${props?.top||100}px` }} >
                <img className='absolute left-18px  z-200' src={props.typeImg} height={40} alt="" />
                <div className={`absolute h-22px z-100 left-19px ml-19px attibute-status w-70px `} >
                    <div style={{ background: props.gradientBk, width: `${props?.width||50}px` }}  className={`absolute left-0  h-22px`}></div>
                    <span className='font-shadow-black text-12px text-center line-height-22px z-500 absolute left-40%' >{props.value}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Attibute;