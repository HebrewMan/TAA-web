import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import backLogo from "@/assets/icon/back.svg";
import { Image as VanImage } from "react-vant";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import paginationImg from "@/assets/icon/pagination.svg";
import salarybtnImg from "@/assets/bakeground/salary_btn.png";
import { getMybag } from "@/api/feature/app";
import { useAccount } from "wagmi";
import device from "current-device";
const Knapsack = () => {
  const isMobile = device.mobile();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const { address } = useAccount();
  const [showUse, setShowUse] = useState(false);
  const [myMall, setMyMall] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 6,
    pages: 1,
  });
  const [actionKnapsack, setActionKnapsack] = useState({
    image: "",
    name: "",
    num: 0,
    rate: 0,
    token_id: 0,
    use: "",
  });
  let allMalls: any = [];
  const knapsack_img = {
    stamina: cleanSvg,
    charm: charismaSvg,
    comfort: staminaSvg,
    intellect: iqSvg,
  };

  const mallHandle = (item: any) => {
    console.log(item);
    setActionKnapsack(item);

    setShowUse(true);
  };

  const getInitData = () => {
    getMybag(address as string).then((res: any) => {
      allMalls = res;
      const start = (pagination.page - 1) * pagination.pageSize;
      const end = pagination.page * pagination.pageSize;
      const result = allMalls.slice(start, end);
      setMyMall(result);
      pagination.pages = Math.ceil(res.length / pagination.pageSize);
      setPagination(pagination);
    });
  };

  // 已有总数据，根据上面逻辑，手动分页
  const handlePagination = (type: string) => {
    if (type === "left") {
      if (pagination.page === 1) {
        return;
      }
      pagination.page--;
    } else {
      if (pagination.page === pagination.pages) {
        return;
      }
      pagination.page++;
    }
    setPagination(pagination);
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = pagination.page * pagination.pageSize;
    const result = allMalls.slice(start, end);
    setMyMall(result);
  };

  useEffect(() => {
    getInitData();
  }, [address]);

  return (
    <>
      {!showUse ? (
        <div className="knapsack">
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

          <div className="main">
            <div className="items">
              {myMall.map((item: any) => (
                <div
                  className="relative h-114px cursor-pointer"
                  key={item.token_id}
                >
                  <div className="item" onClick={() => mallHandle(item)}>
                    <VanImage width="100%" height="100%" src={item.image} />
                  </div>
                  <span className="font-shadow-black">2</span>
                </div>
              ))}
            </div>

            <div
              className="pages pb-10px pt-10px"
              style={{ marginTop: window.innerHeight < 700 ? "4px" : "4px" }}
            >
              <img
                src={paginationImg}
                className="left mr-19px cursor-pointer"
                alt=""
                onClick={() => handlePagination("left")}
              />
              {pagination.page}/{pagination.pages}
              <img
                src={paginationImg}
                className="right ml-19px cursor-pointer"
                alt=""
                onClick={() => handlePagination("right")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="use-box flex flex-col items-center pt-70px">
          {isMobile && (
            <div className="back">
              <img
                src={backLogo}
                width={34}
                height={34}
                alt=""
                onClick={() => setShowUse(false)}
              />
            </div>
          )}

          <div className="knapsack-wrap">
            <div className="knapsack-img w-300px h-270px flex justify-center items-center">
              <VanImage width="176" height="auto" src={actionKnapsack.image} />
            </div>
            <div className="knapsack-name h-48px days-one">
              Cat climbing frame
            </div>
          </div>

          <div className="knapsack-status flex justify-center items-center">
            <VanImage
              width="75"
              height="75"
              src={knapsack_img[actionKnapsack.use]}
            />
            <span className="days-one text-36px color-#402209 ml-50px">
              +{actionKnapsack.rate}
            </span>
          </div>
          <div className="w-287px h-60px relative cursor-pointer">
            <img className="absolute left-0" src={salarybtnImg} alt="" />
            <i className="absolute z-2 top-28px  text-after text-20px font-shadow-black">
              Use
            </i>
          </div>
        </div>
      )}
    </>
  );
};

export default Knapsack;
