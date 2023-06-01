import React, { useState, } from 'react';
import closeSvg from '@/assets/icon/close.svg'
import avaterSvg from '@/assets/icon/avater.svg'
import penSvg from '@/assets/icon/pen.svg';
import starBk from '@/assets/bakeground/star_bk.png';
import feetBk from '@/assets/bakeground/feet_bk.png';

const UserInfoPopup = (props:any)=>{

    return(
        <React.Fragment>
            <div className='user-info-popup'>
                <span className='font-shadow-black'>Title</span>
                <img className='close' src={closeSvg} width={46} alt="" onClick={props.userInfoPopupHandle}/>
                <div className="user-info">
                    <div className="shadow-cur" style={{boxShadow: '0px 6px 0px 0px #E2AA73'}}>
                        <img className="avater" src={avaterSvg} width={40} alt="" />
                        <div className="info">
                            <p className='font-shadow-black text-16px'>NAMENAM<img src={penSvg} width={16} alt="" className='ml-7px'/></p>
                            <p className='text-#402209 text-12px'>1234****2314</p>
                        </div>
                    </div>
                </div>
                <div className="balance">
                    <div className="star font-shadow-black" style={{backgroundImage: `url('${starBk}')`}}>
                        10.1234
                    </div>
                    <div className="feet font-shadow-black" style={{backgroundImage: `url('${feetBk}')`}}>
                        10.1234
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserInfoPopup;