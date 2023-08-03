import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import backLogo from "@/assets/icon/back.svg";
import claimedLogo from "@/assets/icon/claimed.svg";
import salaryImg from "@/assets/bakeground/succed-title.png";
import salarybtnImg from "@/assets/bakeground/salary_btn.png";
import { Image as VanImage } from "react-vant";
import { getTasks, taskReward } from "@/api/feature/app";
import { useAccount } from "wagmi";
import device from "current-device";
const Tasks = () => {
  const isMobile = device.mobile();
  const [taskList, setTaskList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState<null | number>(null);
  const [showReward, setShowReward] = useState(false);
  const [actionItem, setActionItem] = useState({});
  const { address } = useAccount();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  const showClaimHandle = (index: number) => {
    // setCurrentIndex(null)
    setCurrentIndex(index);
  };

  const claimHandle = (index: number) => (event: any) => {
    event.stopPropagation();
    setActionItem(taskList[index]);
    setShowReward(true);
  };

  const closeRewardHandle = () => {
    taskReward({
      address: address,
      task_id: actionItem.task_id,
    }).then((res: any) => {
      setShowReward(false);
      setCurrentIndex(null);
      getInitData();
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
            <div className="back">
              <img
                src={backLogo}
                width={34}
                height={34}
                alt=""
                onClick={() => setShowReward(false)}
              />
            </div>
          )}
          <div className="flex flex-col justify-center items-center h-full butter-sans-text ">
            <VanImage
              className="mb--25px relative z-2"
              width="285"
              height="75"
              src={salaryImg}
            />
            <div className="w-255px h-292px rounded-20px bg-#FFD28E px-12px pt-35px pb-14px flex flex-col items-center">
              <VanImage
                className="relative z-2"
                width="255"
                height="255"
                src={actionItem.task_cover}
              />
              <div className="daysOne text-20px color-#402209 mt-12px">
                {actionItem.task_award}
              </div>
            </div>
            <div className="mt-24px w-278px h-51px relative cursor-pointer">
              <img className="absolute left-0" src={salarybtnImg} alt="" />
              <i
                className="absolute z-2 top-28px  text-after daysOne text-20px font-shadow-black"
                onClick={closeRewardHandle}
              >
                Claim
              </i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
