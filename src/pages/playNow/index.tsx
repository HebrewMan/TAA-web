import React, { ReactElement, useState, useEffect, useContext } from 'react';
import "./index.scss";
import Attibute  from "../../components/attribute"
// import '../../assets/cat/cat1.png'
const PlayNow = () => {


    const [catUrl, setCatUrl] = useState('../../src/assets/cat/cat1.png'); 

    const attibute_list = [
        {top:90,typeImg:'../../src/assets/icon/stamina-r.png',gradientBk:'linear-gradient(180deg, #FF8D8D 0%, #C93413 117.9%)',value:100},
        {top:130,typeImg:'../../src/assets/icon/charisma-r.png',gradientBk:'linear-gradient(180deg, #DB8EFF 0%, #6C1794 118.75%)',value:80},
        {top:170,typeImg:'../../src/assets/icon/clean-r.png',gradientBk:'linear-gradient(180deg, #98CEFF 0%, #0A569D 118.75%)',value:50},
        {top:210,typeImg:'../../src/assets/icon/iq-r.png',gradientBk:'linear-gradient(180deg, #C9F7C2 0%, #3B8734 130%)',value:40},
    ]

    return (
        <React.Fragment>
            <div className="home">
                    <div className="header">
                        <div className="avatar pt-8px">
                            <p className='font-shadow-black text-12px'>NAME</p>
                            <p className='text-#402209 text-8px'>1234****2314</p>
                        </div>
               
                        <span className='set relative'>
                            <img src="../../src/assets/icon/set.png" width={45} alt="" />
                            <i className='text-after text-10px font-shadow-black'>Set</i>
                        </span>
                
                    </div>
                    <div className="life-attribute">

                        {attibute_list.map(item=><Attibute top={item.top} typeImg={item.typeImg} gradientBk={item.gradientBk} value={item.value} key={item.top}/>)}
                        
                    </div>
                    <div className="cat">
                        <img src={catUrl} alt="" width={184}/>
                    </div>
                    <div className="menu">
                            
                    </div>
                </div>

        </React.Fragment>
    )
}

export default PlayNow;