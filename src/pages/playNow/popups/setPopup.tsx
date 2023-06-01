import React, { useState, useEffect} from 'react';

import closeSvg from '@/assets/icon/close.svg'
import musicSvg from '@/assets/icon/music.svg'

import BtnWithShadow from '@/components/btnWithShadow'

const SetPopup = (props:any)=>{

    const btn = {logo:'',text:'Setting',font:'16px',outerColor:'#A94111',shadowColor:'#C6601D',height:46,width:186}

    const logout =()=>{}

    let [musicSwitch,setMusicSwitch] = useState(false);
    const [position, setPosition] = useState(0);
    const [btnColors,setBtnColors] = useState({outerColor:'#A02424',shadowColor:'linear-gradient(0deg, #D64F4F, #D64F4F), #BAD60F'});


    const setMusicSwitchHandle = ()=>{
        musicSwitch=!musicSwitch;
        console.log(musicSwitch,8888)
        setMusicSwitch(musicSwitch);

        if(musicSwitch){
         
            setBtnColors({outerColor:'#C9955C',shadowColor:'#FFD28E'});
            setPosition(90);
        }else{
            setBtnColors({outerColor:'#A02424',shadowColor:'linear-gradient(0deg, #D64F4F, #D64F4F), #BAD60F'});
            setPosition(0)
        }
    }

    return(
        <React.Fragment>
            <div className='share-popup set-popup' style={{height:'260px'}}>
                <BtnWithShadow item={btn}/>
                <img className='close' src={closeSvg} width={46} alt=""  onClick={props.loginPopupHandle}/>

                <div className="switch" >
                    <span>Music Title</span>
                    <div className="switch-btn" style={{background:btnColors.outerColor}} onClick={setMusicSwitchHandle}>
                        <div className="shadow" style={{background:btnColors.shadowColor}}></div>
                    </div>
                    <img src={musicSvg}  width={38} height={38} alt="" style={{ transform: `translateX(${position}px)` }} />
                </div>

                <div className="switch" >
                    <span>Launguage</span>
                    <div className="switch-btn" style={{background:btnColors.outerColor}} onClick={setMusicSwitchHandle}>
                        <div className="shadow" style={{background:btnColors.shadowColor}}></div>
                    </div>
                    <img src={musicSvg}  width={38} height={38} alt="" style={{ transform: `translateX(${position}px)` }} />
                </div>

                 <div className='btn'>
                    <div className="text font-shadow-block" onClick={logout}>Log out</div>
                </div>

            
            </div>
        </React.Fragment>
    )
}

export default SetPopup;