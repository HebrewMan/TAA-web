import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import backLogo from "@/assets/icon/back.svg";
import { Image, Popup } from "react-vant";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import paginationImg from "@/assets/icon/pagination.svg";
import salarybtnImg from "@/assets/bakeground/salary_btn.svg";
import { getMybag } from "@/api/feature/app";
import { useAccount } from "wagmi";
import device from "current-device";
import closeSvg from "@/assets/icon/close.svg";

const UseModal = (props) => {
  const knapsack_img = {
    stamina: cleanSvg,
    charm: charismaSvg,
    health: staminaSvg,
    intellect: iqSvg,
  };
  const actionKnapsack = props.detailData;
  return (
    <div className="use-modal days-one">
      <Image
        className="close-special-popup"
        src={closeSvg}
        width="46"
        height="46"
        onClick={() => props.closeHandle("")}
      />
      <div className="use-modal-main">
        <div className="modal-content">
          <div className="knapsack-img h-240px flex justify-center items-center">
            <Image width="176" height="auto" src={actionKnapsack.image} />
          </div>
          <div className="knapsack-option">
            <Image
              width="34"
              height="auto"
              src={knapsack_img[actionKnapsack.use]}
            />
            <span>+{actionKnapsack.use_val}</span>
          </div>
        </div>
        <div className="modal-text">Cat climbing frame</div>
        <div className="w-full h-60px relative cursor-pointer flex">
          <Image
            className="absolute left-12px top-10px"
            width="267"
            height="auto"
            src={salarybtnImg}
          />
          <i className="absolute top-37px text-after text-26px font-shadow-black2">
            Use
          </i>
        </div>
      </div>
    </div>
  );
};

const Knapsack = () => {
  const isMobile = device.mobile();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const { address } = useAccount();
  const [myMall, setMyMall] = useState([]);

  const [popup, setPopup] = useState("");
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

  const mallHandle = (item: any) => {
    setActionKnapsack(item);
    setPopup("use");
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
                  <Image width="100%" height="100%" src={item.image} />
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
      <Popup
        visible={popup == "use"}
        style={{ background: "none", height: "100%" }}
        position="top"
      >
        <UseModal detailData={actionKnapsack} closeHandle={setPopup}></UseModal>
      </Popup>
    </>
  );
};

export default Knapsack;
