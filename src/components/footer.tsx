import React, {useState} from 'react';
import {  useNavigate, } from 'react-router-dom';

import { setPopusStatus } from "@/redux/action"
import store from '@/redux/store.js'

import "./style/footer.scss"
// import '../../assets/cat/cat1.png'
const Footer = () => {

    const navigate = useNavigate();

    const routerHandle = (path:string)=>{
        if(window.screen.availWidth <= 1000){
            setNav(path);navigate(`/${path.toLowerCase()}`)
            return
        }
        store.dispatch(setPopusStatus("22"))
        console.log(store.getState().popupsStatus)
    };

    const baseUri = '../../src/assets/icon';

    const [nav, setNav] = useState('PlayNow'); 

    const navBar = [
        {baseImage:`${baseUri}/playnow.png`,baseCurImage:`${baseUri}/base-cur.png`,path:'PlayNow',},
        {baseImage:`${baseUri}/market.png`,baseCurImage:`${baseUri}/base-cur.png`,path:'Market',},
        {baseImage:`${baseUri}/mynft.png`,baseCurImage:`${baseUri}/base-cur.png`,path:'MyNFT',},
        {baseImage:`${baseUri}/introduce.png`,baseCurImage:`${baseUri}/base-cur.png`,path:'Introduce',},
    ]


    return (
        <React.Fragment>
            <div className='footer '>
                <span className='welcome'>
                    WELCOME!
                </span>
                <ul>
                    { store.getState().popupsStatus }
                    {navBar.map(item=>
                        <li className={item.path == nav ? 'li-cur':''} onClick={()=>routerHandle(item.path)} key={item.path}>
                            <img src={item.baseImage} alt=""/>
                            <img src={item.baseCurImage} alt="" width={70} className='base-cur'/>
                            <span className='font-shadow-black'>{item.path}</span>
                        </li>
                    )}
                </ul>
               
            </div>
        </React.Fragment>
    )
}

export default Footer;