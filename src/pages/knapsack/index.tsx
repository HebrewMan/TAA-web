import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.scss";
import backLogo from '@/assets/icon/back.svg';

import mallImg1 from '@/assets/malls/1.svg';
import mallImg2 from '@/assets/malls/2.svg';
import mallImg3 from '@/assets/malls/3.svg';
import mallImg4 from '@/assets/malls/4.svg';
import mallImg5 from '@/assets/malls/5.svg';
import mallImg6 from '@/assets/malls/6.svg';

import paginationImg from '@/assets/icon/pagination.svg';


import { Flex ,Toast  } from 'react-vant'

const Knapsack = ()=>{

    const isAndroid = /android/i.test(navigator.userAgent);
    const navigate = useNavigate();
    const handleGoBack = ()=>navigate(-1)


    const [myMall,] = useState([mallImg1,mallImg2,mallImg3,mallImg4,mallImg5,mallImg6]);

    const mallHandle = ()=> Toast('Hello')

    return (
        <React.Fragment>
            <div className="knapsack">
                <div className="back">
                    <img src={backLogo} width={34} height={34} alt="" onClick={handleGoBack}/>
                </div>
                <div className="main">

                    <div className="items">
                        <Flex justify='center' align='center' wrap='wrap'>
                            {myMall.map(item=>
                                    <Flex.Item span={12} key={item} >
                                        <div className='item' onTouchStart={mallHandle}>
                                        {/* <img src={item} alt="" /> 
                                        <object type="image/svg+xml" data={item}></object> */}
                                            {isAndroid? <img src={item} alt="" /> : <object type="image/svg+xml" data={item}></object>}
                                        </div>
                                        <span className='font-shadow-black'>2</span>
                                    </Flex.Item>
                            )}
                        </Flex>
                    </div>

                    <div className="pages" style={{marginTop:window.innerHeight<700 ? '15px':'90px'}}>
                        <img src={paginationImg} className='left mr-19px' alt="" />
                            1/5
                        <img src={paginationImg} className='right ml-19px' alt="" />
                    </div>
                              
                  
                </div>
            </div>
          
        </React.Fragment>
    )
}

export default Knapsack;