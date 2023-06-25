import React, { useState, useEffect } from 'react';
import {  useNavigate, } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { setPopusStatus } from "@/redux/action"

import "./index.scss";
import Attibute from "@/components/attribute";

import AttibuteDetailsPopup  from "./popups/attributeDetailsPopup";
import UserInfoPopup  from "./popups/userInfoPopup";
import SharePopup  from "./popups/sharePopup";
import LoginPopup  from "./popups/loginPopup";
import SetPopup from './popups/setPopup';
import SpecialPopup from './popups/specialPopup';
import Introduce from "@/pages/introduce"


import { Popup ,Toast } from 'react-vant';

import staminaSvg from '@/assets/icon/staminaLogo.svg';
import charismaSvg from '@/assets/icon/charismaLogo.svg';
import cleanSvg from '@/assets/icon/cleanLogo.svg';
import iqSvg from '@/assets/icon/iqLogo.svg';

import shareSvg from '@/assets/icon/share.svg';
import setSvg from '@/assets/icon/set.svg';

import groupSvg from '@/assets/icon/group.svg'



// import '../../assets/cat/cat1.png'
const PlayNow = () => {
    const { status } = useSelector( (state:any) => state.popupsStatus )
    
    const menu = ['knapsack','friends','tasks','malls'];

    const [catUrl, ] = useState('../../src/assets/cat/cat1.png'); 

    const [popup,setPopup] = useState('');

    const dispatch = useDispatch();
    const onClose = ()=>{
        dispatch(setPopusStatus(""))
        setPopup('');
    }

    //渲染pc版弹窗
    useEffect(()=>{
        setPopup(status)
    },[status])


    const attibute_list = [
        {typeImg:staminaSvg,gradientBk:'linear-gradient(180deg, #FF8D8D 0%, #C93413 117.9%)',value:100},
        {typeImg:charismaSvg,gradientBk:'linear-gradient(180deg, #DB8EFF 0%, #6C1794 118.75%)',value:80},
        {typeImg:cleanSvg,gradientBk:'linear-gradient(180deg, #98CEFF 0%, #0A569D 118.75%)',value:50},
        {typeImg:iqSvg,gradientBk:'linear-gradient(180deg, #C9F7C2 0%, #3B8734 130%)',value:40},
    ]

    const nav = useNavigate();

    const routerHandle = (path:string)=>{
        if(window.screen.availWidth <= 1000){
            if(path!='tasks'&&path!='knapsack'){
                Toast({message: 'Coming Soon',});
                return
            }
            nav(`/${path}`);
            return
        }
        dispatch(setPopusStatus(path))
    }

    let isIntroduce;
    if(status === 'Introduce') isIntroduce = <Introduce/>

    return (
        <React.Fragment>
            <div className="home">
                    <div className="header">
                        <div className="avatar pt-8px" onClick={()=>setPopup('cat')}>
                            <p className='font-shadow-black text-12px'>NAME</p>
                            <p className='text-#402209 text-8px'>1234****2314</p>
                        </div>
                        <span className='set relative ml-90px' onClick={()=>setPopup('share')}>
                            <img src={shareSvg} width={45} alt="" />
                            <i className='text-after text-10px font-shadow-black top-42px'>Share</i>
                        </span>
               
                        <span className='set relative bottom-1px'  onClick={()=>setPopup('set')}>
                            <img src={setSvg} width={45} alt="" />
                            <i className='text-after text-10px font-shadow-black top-42px'>Set</i>
                        </span>
                    </div>
                    

                    <Popup visible={popup == 'set'} style={{background:'none', height: '100%' }}  position='top' >
                        <SetPopup onClose={onClose}/>
                    </Popup>

                    <Popup visible={popup == 'login'} style={{background:'none', height: '100%' }}  position='top' >
                        <LoginPopup onClose={onClose}/>
                    </Popup>
                    
                    <Popup visible={popup == 'attibute'} style={{background:'none', height: '82%' }}  position='top' onClose={onClose}>
                        <AttibuteDetailsPopup onClose={onClose}/>
                    </Popup>

                    <Popup visible={popup == 'share'} style={{background:'none',height:'100%'}}  >
                        <SharePopup onClose={onClose}/>
                    </Popup>

                    <Popup visible={popup == 'cat'} style={{background:'none', height: '77%'}}  position='top'>
                        <UserInfoPopup onClose={onClose}/>
                    </Popup>

                    <Popup visible={ popup == 'Market' || popup == 'MyNFT' || popup == 'knapsack' || popup == 'tasks' } style={{background:'none', height: '100%'}}  position='top'>
                        <SpecialPopup popupStatus = {status} onClose={onClose}/>
                    </Popup>

                    {/* <Popup visible={ popup == 'Introduce'} style={{background:'none', height: '100%'}}  position='top'> */}
                    { isIntroduce }
                    <div className="life-attribute">
                        <img src={groupSvg} alt="" className='group-left'/>
                        <img src={groupSvg} alt="" className='group-right'/>
                        {attibute_list.map(item=>
                            <Attibute height={25} logoWidth={34} typeImg={item.typeImg} gradientBk={item.gradientBk} value={item.value} key={item.typeImg}/>
                        )}
                    </div>
                    <div className="cat" onClick={()=>setPopup('attibute')}>
                        <img src={catUrl} alt="" width={184}/>
                    </div>
                    <div className="menu">
                        { menu.map(item=>
                            <div onClick={()=>routerHandle(item)} className={`menu-item relative ${item!='knapsack'&& 'mt-8px'}` } key={item} >
                                <img src={`../../src/assets/icon/${item}.png`} width={52} alt="" />
                                <i className='text-after text-12px font-shadow-black top-50px'>{item}</i>
                            </div>
                        )}
                    </div>
                </div>
        
        </React.Fragment>
    )
}

export default PlayNow;