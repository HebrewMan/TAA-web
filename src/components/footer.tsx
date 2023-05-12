import React, {useState,  } from 'react';
import "./style/footer.scss"
// import '../../assets/cat/cat1.png'
const Footer = (props:any) => {

    const baseUri = '../../src/assets/icon';

    const [nav, setNav] = useState('PlayNow'); 

    const handleNav = (nav:string)=>{
        setNav(nav)
    }

    const navBar = [
        {baseImage:`${baseUri}/playnow.png`,baseCurImage:`${baseUri}/base-cur.png`,title:'PlayNow',path:'palynow'},
        {baseImage:`${baseUri}/market.png`,baseCurImage:`${baseUri}/base-cur.png`,title:'Market',path:'market'},
        {baseImage:`${baseUri}/mynft.png`,baseCurImage:`${baseUri}/base-cur.png`,title:'My NFT',path:'mynft'},
        {baseImage:`${baseUri}/introduce.png`,baseCurImage:`${baseUri}/base-cur.png`,title:'Introduce',path:'introduce'},
    ]

    return (
        <React.Fragment>
            <div className='footer '>
                <ul>
                    {navBar.map(item=>
                        <li className={item.title == nav? 'li-cur':''} onClick={()=>handleNav(item.title)} key={item.title}>
                            <img src={item.baseImage} alt=""  />
                            <img src={item.baseCurImage} alt="" width={70}  className='base-cur'/>
                            <span className='font-shadow-black'>{item.title}</span>
                        </li>
                    )}
                </ul>
               
            </div>
        </React.Fragment>
    )
}

export default Footer;