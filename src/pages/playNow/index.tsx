import React, { useState, } from 'react';
import "./index.scss";
import Attibute from "@/components/attribute";

import AttibuteDetailsPopup  from "./attributeDetailsPopup";
import { Popup,PopupPosition } from 'react-vant';

import staminaSvg from '@/assets/icon/staminaLogo.svg';
import charismaSvg from '@/assets/icon/charismaLogo.svg';
import cleanSvg from '@/assets/icon/cleanLogo.svg';
import iqSvg from '@/assets/icon/iqLogo.svg';

// import '../../assets/cat/cat1.png'
const PlayNow = () => {


    const [catUrl, setCatUrl] = useState('../../src/assets/cat/cat1.png'); 

    const [state, setState] = useState<PopupPosition>('')

    const onClose = () => setState('')

    const attibute_list = [
        {typeImg:staminaSvg,gradientBk:'linear-gradient(180deg, #FF8D8D 0%, #C93413 117.9%)',value:100},
        {typeImg:charismaSvg,gradientBk:'linear-gradient(180deg, #DB8EFF 0%, #6C1794 118.75%)',value:80},
        {typeImg:cleanSvg,gradientBk:'linear-gradient(180deg, #98CEFF 0%, #0A569D 118.75%)',value:50},
        {typeImg:iqSvg,gradientBk:'linear-gradient(180deg, #C9F7C2 0%, #3B8734 130%)',value:40},
    ]

    return (
        <React.Fragment>
            <div className="home">
                    <div className="header">
                        <div className="avatar pt-8px" >
                            <p className='font-shadow-black text-12px'>NAME</p>
                            <p className='text-#402209 text-8px'>1234****2314</p>
                        </div>
               
                        <span className='set relative'  >
                            <img src="../../src/assets/icon/set.png" width={45} alt="" />
                            <i className='text-after text-10px font-shadow-black top-42px'>Set</i>
                        </span>
                
                    </div>
                    
                    <Popup  visible={state === 'top'} style={{background:'none', height: '82%' }}  position='top' onClose={onClose}>
                        <AttibuteDetailsPopup/>
                    </Popup>


                    <div className="life-attribute">

                        {attibute_list.map(item=><Attibute height={25} logoWidth={34} typeImg={item.typeImg} gradientBk={item.gradientBk} value={item.value} key={item.typeImg}/>)}
                        
                    </div>
                    <div className="cat" onClick={()=>setState('top')}>
                        <img src={catUrl} alt="" width={184}/>
                    </div>
                    <div className="menu">
                        <div className='menu-item relative'>
                            <img src="../../src/assets/icon/knapsack.png" width={52} alt="" />
                            <i className='text-after text-12px font-shadow-black top-50px'>Knapsack</i>
                        </div>
                        <div className='menu-item relative mt-8px'>
                            <img src="../../src/assets/icon/friends.png" width={52} alt="" />
                            <i className='text-after text-12px font-shadow-black top-50px'>Friends</i>
                        </div>
                        <div className='menu-item relative mt-8px'>
                            <img src="../../src/assets/icon/tasks.png" width={52} alt="" />
                            <i className='text-after text-12px font-shadow-black top-50px'>tasks</i>
                        </div>
                        <div className='menu-item relative mt-8px'>
                            <img src="../../src/assets/icon/malls.png" width={52} alt="" />
                            <i className='text-after text-12px font-shadow-black top-50px'>malls</i>
                        </div>
                    </div>
                </div>
        


        </React.Fragment>
    )
}

export default PlayNow;