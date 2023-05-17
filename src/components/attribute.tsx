import React, {useState,  } from 'react';
import "./style/attribute.scss"
// import '../../assets/cat/cat1.png'
const Attibute = (props:any) => {


    const [fkBkUrl, setFkBkUrl] = useState('../../src/assets/icon/fkbk.png'); 

    return (
        <React.Fragment>
            <div className='attibute text-align-center relative mb-8px' style={{width:'54px'}}>
                <img className=' z-200 ml-20px' src={props.typeImg} width={props.logoWidth} alt="" />
                <div className={`absolute z-100 left-19px ml-19px attibute-status `} style={{width:`${props.logoWidth*2}px`,height:`${props.height}px`}}>
                    <div style={{ background: props.gradientBk, width: `${props?.width||50}px` }}  className={`absolute left-0  h-28px`}></div>
                    <span className='font-shadow-black text-12px text-center z-500 absolute left-40%' style={{lineHeight:`${props.height}px`}}>{props.value}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Attibute;