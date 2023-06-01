import React, { useState, useEffect} from 'react';
import  {Loading as LoadingVant}  from 'react-vant';

import closeSvg from '@/assets/icon/close.svg'
import successLogo from '@/assets/icon/success.svg';
import failLogo from '@/assets/icon/fail.svg';

interface StatusProps {
    logo?: string;
    text: string;
}

const StatusPopup = (props:any)=>{

    const Status:React.FC<StatusProps> = ({ logo, text }) => (
        <div>
            <div className="status">
                {text === "Loading"? <LoadingVant  color='#402209' size={36}/> : <img src={logo} width={36} alt="" /> }
                
                {text}
            </div>
        </div>
    );

    const Success = () => <Status logo={successLogo} text="Success" />;
    const Fail = () => <Status logo={failLogo} text="Failure" />;
    const Loading = () => <Status text="Loading" />;

    let loginMain = <Loading/>

    if(props.type == 'Success') loginMain=<Success/>;
    if(props.type == 'Fail') loginMain=<Fail/>;
    if(props.type == 'Loading') loginMain=<Loading/>;

    return(
        <React.Fragment>
            <div className='login-popup' style={{top:window.innerHeight<700 ? '-10%':'0'}}>
                <span className='title font-shadow-black'>{props.title}</span>
                <img className='close' src={closeSvg} width={46} alt="" onClick={props.loginPopupHandle}/>
                {loginMain} 
                <div className='btn'>
                    <div className="text font-shadow-block" onClick={props.login}>{props.text == 'Loading'?'. . .':'OK'}</div>
                </div>
            
            </div>
        </React.Fragment>
    )
}

export default StatusPopup;