import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.scss";
import backLogo from '@/assets/icon/back.svg';
import giftLogo from '@/assets/icon/gift.svg';
import claimedLogo from '@/assets/icon/claimed.svg';


const Tasks = ()=>{

    const [taskList,setTaskList] = useState(['Task1','Task2','Task3']);

    const [currentIndex,setCurrentIndex] = useState<null|number>(null);
    const navigate = useNavigate();
    const handleGoBack = ()=>navigate(-1)

    const showClaimHandle = (index:number)=>{
        // setCurrentIndex(null)
        setCurrentIndex(index);
    }

    const claimHandle = (num:number)=>(event:any)=>{
        event.stopPropagation();
        console.log(num)
        console.log(setTaskList)
    }

    return (
        <React.Fragment>
            <div className="tasks">
                <div className="back">
                    <img src={backLogo} width={34} height={34} alt="" onClick={handleGoBack}/>
                </div>
                <div className="main">
                    {taskList.map((item,index)=>
                        
                        <div className={`item ${index==0 ? 'mt-115px':'mt-12px' }`} key={index} onClick={()=>showClaimHandle(index)}>
                            <div className="top">
                                <div className="left w-80px h-64px">
                                    <img src={giftLogo} width={64} height={64} alt="" className="left mr-16px"/>
                                </div>
                                <div className="right h-64px">
                                    <p className='task-title'>
                                       {currentIndex==index && <img src={claimedLogo} width={20} height={20} alt="" className=" mr-5px"/>} 
                                        {item}
                                    </p>
                                    <p className='description'>Short description Short description</p>
                                </div>
                            </div>

                            {currentIndex==index && 
                                <div className='btn'>
                                    <div className="text font-shadow-block" onClick={claimHandle(1)}>Claim</div>
                                </div>
                            }
                        
                        </div>
                    
                    )}
                  
                </div>
            </div>
          
        </React.Fragment>
    )
}

export default Tasks;