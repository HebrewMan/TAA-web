import React, { useState, } from 'react';
import closeSvg from '@/assets/icon/close.svg'

import twitterSvg from '@/assets/icon/twitter.svg';
import facebook from '@/assets/icon/facebook.svg';
import link from '@/assets/icon/link.svg';
import BtnWithShadow from '@/components/btnWithShadow'
const SharePopup = (props:any)=>{
    const btns = [
        {logo:'',text:'Share',font:'16px',outerColor:'#AC4111',shadowColor:'#C6601D',height:52,width:186},
        {logo:twitterSvg,text:'Twitter',font:'16px',outerColor:'#3776AA',shadowColor:'#4594D5',height:52,width:199},
        {logo:facebook,text:'Facebook',font:'16px',outerColor:'#364776',shadowColor:'#435994',height:52,width:199},
        {logo:link,text:'Copy Link',font:'16px',outerColor:'#889B0E',shadowColor:'#AAC211',height:52,width:199},
    ]

    return(
        <React.Fragment>
            <div className='share-popup'>
                <BtnWithShadow item={btns[0]}/>
                <img className='close' src={closeSvg} width={46} alt="" onClick={props.sharePopupHandle}/>

                <div className="share-btns">
                    { btns.map(item=> item.logo && <BtnWithShadow key={item.text} item={item}/>)}
                </div>
               

            </div>
        </React.Fragment>
    )
}

export default SharePopup;