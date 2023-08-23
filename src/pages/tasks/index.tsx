import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import backLogo from "@/assets/icon/back.svg";
import claimedLogo from "@/assets/icon/claimed.svg";
import salaryImg from "@/assets/bakeground/succed-title.png";
import { Image, Swiper, Toast } from "react-vant";
import { doSign, getTaskDetail, getTasks } from "@/api/feature/app";
import { useAccount, useContractWrite } from "wagmi";
import device from "current-device";
import { ArrowLeft, Arrow } from "@react-vant/icons";
import taapABI from "@/abi/taap.json";
import { taap } from "@/config/constantAddress";
import Button from "@/components/Button/index";
const Tasks = () => {
  const isMobile = device.mobile();
  const [taskList, setTaskList] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState<null | number>(null);
  const [showReward, setShowReward] = useState(false);
  const [actionItem, setActionItem] = useState<any>({});
  const { address } = useAccount();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const ref = useRef<any>(null);
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    address: taap,
    abi: taapABI,
    functionName: "mint",
  });

  let initialSwipe = 0;

  const showClaimHandle = (index: number) => {
    // setCurrentIndex(null)
    setCurrentIndex(index);
  };

  const claimHandle = (index: number) => (event: any) => {
    event.stopPropagation();
    getTaskDetail({ address }, taskList[index].task_id).then((res) => {
      setActionItem(res);
      setShowReward(true);
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowReward(false);
      setCurrentIndex(null);
      getInitData();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading) {
      Toast.loading({
        message: "Loading",
        duration: 60000,
        overlay: true,
        overlayStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      });
    } else {
      Toast.clear();
    }
  }, [isLoading]);

  const closeRewardHandle = () => {
    if (isLoading) {
      return;
    }
    doSign({
      address,
      token_id: actionItem.task_award[initialSwipe].tokenid,
    }).then((res: any) => {
      writeAsync({
        args: [res.tokenid, res.amount, res.signature],
      });
    });
  };

  const getInitData = () => {
    getTasks().then((res: any) => {
      setTaskList(res);
    });
  };
  useEffect(() => {
    getInitData();
  }, []);

  const swiperChange = (index: any) => {
    initialSwipe = index;
  };

  const swiperLeftHandle = () => {
    ref.current.swipePrev();
  };

  const swiperRightHandle = () => {
    ref?.current?.swipeNext();
  };

  return (
    <>
      {!showReward ? (
        <div className="tasks overflow-hidden">
          {isMobile && (
            <div className="back">
              <img
                src={backLogo}
                width={34}
                height={34}
                alt=""
                onClick={handleGoBack}
              />
            </div>
          )}
          <div className="main-wrap pt-90px">
            <div className="main ">
              {taskList.map((item: any, index) => (
                <div
                  className="item mt-12px cursor-pointer"
                  key={item.task_id}
                  onClick={() => showClaimHandle(index)}
                >
                  <div className="top w-full">
                    <div className="left w-80px h-64px">
                      <img
                        src={item.task_cover}
                        width={64}
                        height={64}
                        alt=""
                        className="left mr-16px"
                      />
                    </div>
                    <div className="right h-64px">
                      <p className="task-title">
                        {currentIndex == index && (
                          <img
                            src={claimedLogo}
                            width={20}
                            height={20}
                            alt=""
                            className=" mr-5px"
                          />
                        )}
                        {item.task_title}
                      </p>
                      <p className="description">{item.task_desc}</p>
                    </div>
                  </div>

                  {currentIndex == index && (
                    <div className="btn">
                      <div
                        className="text font-shadow-block"
                        onClick={claimHandle(index)}
                      >
                        Claim
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="task-reward overflow-hidden">
          {isMobile && (
            <div className="back z-10 relative">
              <Image
                src={backLogo}
                width="34"
                height="34"
                alt=""
                onClick={() => setShowReward(false)}
              />
            </div>
          )}
          <div className="important-flex flex-col justify-center items-center h-full butter-sans-text relative">
            <div
              className="absolute left-10px top-50% z-10"
              onClick={swiperLeftHandle}
            >
              <ArrowLeft className="text-30px" />
            </div>
            <div
              className="absolute right-10px top-50% z-10"
              onClick={swiperRightHandle}
            >
              <Arrow className="text-30px" />
            </div>
            <Swiper indicator={false} ref={ref} onChange={swiperChange}>
              {actionItem.task_award.map((task_award: any) => (
                <Swiper.Item
                  key={task_award.tokenid}
                  className="important-flex flex-col justify-center items-center"
                >
                  <Image
                    className="mb--25px relative z-2"
                    width="285"
                    height="75"
                    src={salaryImg}
                  />
                  <div className="w-255px h-292px rounded-20px bg-#FFD28E px-12px pt-35px pb-14px flex flex-col items-center">
                    <Image
                      className="relative z-2"
                      width="255"
                      height="255"
                      src={task_award.image}
                    />
                    <div className="daysOne text-20px color-#402209 mt-12px flex">
                      {/* <Image
                        width="34"
                        height="auto"
                        src={knapsack_img[task_award.use]}
                      /> */}
                      {/* <span>+{task_award.amount}</span> */}
                    </div>
                  </div>
                </Swiper.Item>
              ))}
            </Swiper>

            <div className="mt-24px w-278px h-51px relative cursor-pointer">
              <Button
                bgColor1="#AAC211"
                bgColor2="#bad60f"
                text="Claim"
                size="26px"
                status={isLoading ? 0 : 1}
                onClick={closeRewardHandle}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
