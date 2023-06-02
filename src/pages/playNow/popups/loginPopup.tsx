import React, { useState, useEffect} from 'react';
import  {Loading as LoadingVant}  from 'react-vant';

import closeSvg from '@/assets/icon/close.svg'
import walletConncetLogo from '@/assets/icon/walletConnet-logo.svg';
import successLogo from '@/assets/icon/success.svg';
import failLogo from '@/assets/icon/fail.svg';
interface StatusProps {
    logo: string;
    text: string;
  }

const LoginPopup = (props:any)=>{
    const [type,setType] = useState('Email');

    const [loginText,setLoginText] = useState('Log in');
    const [codeText,setCodeText] = useState('Send');

    const typeHandle = (t:string)=>setType(t);

    const Email = ()=>
    <div>
        <div className="input-email" style={{top:'60%'}}>
            <input type="text" placeholder='Please enter your email'/>
        </div>  

        <div className="input-email" style={{top:'72%'}} >
            <input type="text" placeholder='verification code'/>
            <div className="code">
                <span className="font-shadow-block" >{codeText}</span>
            </div>
        </div>   
    </div> 

    const Wallet = ()=>
    <div>
        <div className="wallet-conncet">
       
            <img  src={walletConncetLogo} width={28} alt="" /> WalletConncet
        </div>
    </div>

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
    const Loading = () => <Status logo={failLogo} text="Loading" />;

    let loginMain = <Email/>

    if(type == 'Email') loginMain=<Email/>;
    if(type == 'Wallet') loginMain=<Wallet/>;
    if(type == 'Success') loginMain=<Success/>;
    if(type == 'Fail') loginMain=<Fail/>;
    if(type == 'Loading') loginMain=<Loading/>;



    const login =()=>{
        setType('Loading')
        setLoginText('. . .');
        setTimeout(()=>{
            setType('Success');
            setLoginText('OK');
        },3000)
    }

   
    return(
        <React.Fragment>
            <div className='login-popup' style={{top:window.innerHeight<700 ? '-10%':'0'}}>
                <span className='title font-shadow-black'>Log in</span>
                <img className='close' src={closeSvg} width={46} alt="" onClick={props.onClose}/>

                {(type == 'Email' || type ==  'Wallet') && 
                    (<div className="tab">
                        <div className={`${type == 'Email'&&'outer-ring'} type`} onClick={()=>typeHandle('Email')}>
                            <div className="text " >Email</div>
                        </div>
                        <div className={`${type == 'Wallet'&&'outer-ring'} type`} onClick={()=>typeHandle('Wallet')}>
                            <div className="text">Wallet</div>
                        </div>
                    </div>)
                }

                {loginMain} 
                 <div className='btn'>
                    <div className="text font-shadow-block" onClick={login}>{loginText}</div>
                </div>
            
            </div>
        </React.Fragment>
    )
}

export default LoginPopup;