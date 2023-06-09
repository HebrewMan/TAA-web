import React, { useState } from 'react';
import "./index.scss";
import { Flex ,Toast  } from 'react-vant'

import mallImg1 from '@/assets/malls/1.svg';
import mallImg2 from '@/assets/malls/2.svg';
import mallImg3 from '@/assets/malls/3.svg';
import mallImg4 from '@/assets/malls/4.svg';
import mallImg5 from '@/assets/malls/5.svg';
import mallImg6 from '@/assets/malls/6.svg';
import token1Img from '@/assets/icon/token1.svg';
import downSvg from '@/assets/icon/down.svg';

const MyNFT = ()=>{
    const [type,setType] = useState('Market');

    const [taskList,setTaskList] = useState(['Task1','Task2','Task3']);

    const [marketDatas,setMarketDatas] = useState([mallImg1,mallImg2,mallImg3,mallImg4,mallImg5,mallImg6]);
  

    return (
        <React.Fragment>
            <div className="market">

                <div className="main">
                    {(type == 'Market' || type ==  'Adopt') && 
                        (<div className="nav">
                            <div className={`${type == 'Market'&&'outer-ring'} type`} onClick={()=>setType('Market')}>
                                <div className="text " >Market</div>
                            </div>
                            <div className={`${type == 'Adopt'&&'outer-ring'} type`} onClick={()=>setType('Adopt')}>
                                <div className="text">Adopt</div> 
                            </div>
                        </div>)
                    }


                    <div className="metu">
                        <div className="lang-btn"  >
                            <div className="lang-shadow" >
                                <span>floor price</span>
                                <img src={downSvg} width={10} height={10} alt="" />
                            </div>
                        </div>

                        <div className="lang-btn"  >
                        <div className="lang-shadow" >
                             <span>floor price</span>
                             <img src={downSvg} width={10} height={10} alt="" />
                        </div>
                    </div>
                    </div>

                    


                    <div className="items">
                            <Flex justify='center' align='center' wrap='wrap'>
                        
                            {marketDatas.map(item=>
                             
                                <Flex.Item span={12} key={item}>
                                    <div className='item' onClick={()=>Toast('Hello')}>
                                       
                                        <div className='bottom'>
                                            <img src={item} width={80} alt="" />
                                        </div>
                                        <div className="top">
                                                <span>Name</span>
                                                <span>#001</span>
                                        </div>
                                    </div>
                                    <div className="price">
                                        10
                                    </div>
                                    <img src={token1Img}  className='token-logo' alt="" />
                                </Flex.Item>
                            )}
                        </Flex>
                        </div>
                </div>

               
                
               
     
            </div>
          
        </React.Fragment>
    )
}

export default MyNFT;