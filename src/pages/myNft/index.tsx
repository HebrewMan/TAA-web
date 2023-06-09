import React, { useState } from 'react';
import "./index.scss";
import { Flex , } from 'react-vant'
import catPng from '@/assets/cat/cat1.png';

import musicSvg from '@/assets/icon/music.svg';

const MyNFT = ()=>{

    const [catUrl, ] = useState(catPng); 
    const height = window.innerHeight - 180;

    const [myNFTs,] = useState([1,2,3,4,5,6,7,8,9,0]);



    let [musicSwitch,setMusicSwitch] = useState(false);
    const [position, setPosition] = useState(0);
    const [btnColors,setBtnColors] = useState({outerColor:'#7AD170',shadowColor:'#935C33'});


    const setMusicSwitchHandle = ()=>{
        
        setMusicSwitch(musicSwitch=!musicSwitch);
        setPosition(musicSwitch?20:0);
        setBtnColors(
            musicSwitch?
            {outerColor:'#7AD170',shadowColor:'#7AD170'}:
            {outerColor:'#935C33',shadowColor:'#935C33'}
        )
    }


    return (
        <React.Fragment>
            <div className="my-nft">
                <div className="main" style={{height:height+'px'}}>
                    <Flex justify='center' align='center' wrap='wrap'>
                        
                        {myNFTs.map(item=>
                             
                            <Flex.Item span={12} key={item}>
                                <div className='item'>
                                    <div className="top">
                                            <span>Name</span>
                                            <span>#001</span>
                                            <div className="switch" style={{marginBottom:'2px'}}>
                                                <div className="switch-btn" style={{background:btnColors.outerColor}} onClick={setMusicSwitchHandle}></div>
                                                <img src={musicSvg} className='music-logo' width={16} height={16} alt="" style={{ transform: `translateX(${position}px)` }} onClick={setMusicSwitchHandle}/>
                                            </div>
                                        </div>
                                        <div className='bottom'>
                                            <span>Resting</span>
                                            <img src={catUrl} width={80} alt="" />
                                        </div>
                                </div>
                            </Flex.Item>
                        )}
                    </Flex>
                </div>
            </div>
          
        </React.Fragment>
    )
}

export default MyNFT;