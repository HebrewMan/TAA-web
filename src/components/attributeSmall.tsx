import React, {useState,  } from 'react';
import "./style/attribute.scss"
// import '../../assets/cat/cat1.png'
const Attibute = (props:any) => {


    const [fkBkUrl, setFkBkUrl] = useState('../../src/assets/icon/fkbk.png'); 

    return (
        <React.Fragment>
            <div className='attibute small relative mb-8px' style={{width:'64px'}}>
                <img className='z-200' src={props.typeImg} width={props.logoWidth} alt="" />
                <div className={`absolute z-100 left-10px  attibute-status `} style={{width:`${props.logoWidth*2}px`,height:`${props.height}px`}}>
                    <div style={{ background: props.gradientBk, width: `${props?.width||30}px` }}  className={`absolute h-24px`}></div>
                    <span className='font-shadow-black text-10px text-center z-500 absolute left-40%' style={{lineHeight:`${props.height}px`}}>{props.value}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Attibute;