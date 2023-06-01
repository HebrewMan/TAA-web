import React, {useState} from 'react';
import "../index.scss"
import staminaSvg from '@/assets/icon/staminaLogo.svg';
import charismaSvg from '@/assets/icon/charismaLogo.svg';
import cleanSvg from '@/assets/icon/cleanLogo.svg';
import iqSvg from '@/assets/icon/iqLogo.svg';
import penSvg from '@/assets/icon/pen.svg';

import AttibuteSmall from "@/components/attributeSmall";

// import '../../assets/cat/cat1.png'
const AttibuteDetails = (props:any) => {
  
    const attibute_list = [
        {typeImg:staminaSvg,gradientBk:'linear-gradient(180deg, #FF8D8D 0%, #C93413 117.9%)',value:100},
        {typeImg:charismaSvg,gradientBk:'linear-gradient(180deg, #DB8EFF 0%, #6C1794 118.75%)',value:80},
        {typeImg:cleanSvg,gradientBk:'linear-gradient(180deg, #98CEFF 0%, #0A569D 118.75%)',value:50},
        {typeImg:iqSvg,gradientBk:'linear-gradient(180deg, #C9F7C2 0%, #3B8734 130%)',value:40},
    ]

    return (
        <React.Fragment>
            <div className='attibute-details-popup'>
                <div className='main'>
                    <div className="title font-shadow-black">Cat Detail</div>
                    <img className='cat' src="../../src/assets/cat/cat1.png" alt="" />
                    <p className='name'>Caunienaien  <img src={penSvg} alt="" width={22}  className='ml-8px'/></p>
                    <div className='attibute_list'>
                        {attibute_list.map(item=><AttibuteSmall  logoWidth={27} height={20} typeImg={item.typeImg} gradientBk={item.gradientBk} value={item.value} key={item.typeImg}/>)}
                    </div>                        
                </div>
                <div className="attibutes">
                    <div className="btn" style={{boxShadow: '0px 5px 0px 0px #E2AA73'}}>
                        {attibute_list.map(item => <img src={item.typeImg} width={48} alt="" key={item.typeImg} />) }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AttibuteDetails;