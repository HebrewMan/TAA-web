import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import backLogo from "@/assets/icon/back.svg";
import { Image, Popup, Toast } from "react-vant";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import paginationImg from "@/assets/icon/pagination.svg";
import { getMybag, useProp as usePropFetch } from "@/api/feature/app";
import { useAccount, useContractWrite } from "wagmi";
import device from "current-device";
import closeSvg from "@/assets/icon/close.svg";
import taapAbi from "@/abi/taap.json";
import Button from "@/components/Button/index";
import { useRootSelector } from "@/store/hooks";
import { selectCatSlice } from "@/store/slices/catSlice";
import { useActivate, useUnactivate } from "react-activation";

const knapsack_img: any = {
  stamina: cleanSvg,
  happiness: charismaSvg,
  health: staminaSvg,
  comfort: iqSvg,
};
const UseModal = (props: any) => {
  const actionKnapsack = props.detailData;
  const { address } = useAccount();
  const { defaultCat } = useRootSelector(selectCatSlice);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x13164aE7D47c0a57775106E1A34fCeA6615717FA",
    abi: taapAbi,
    functionName: "burn",
    args: [address, actionKnapsack.token_id, 1],
  });

  useEffect(() => {
    if (isSuccess) {
      Toast.clear();
      props.closeHandle();
    }
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
  }, [data, isLoading, isSuccess]);

  const burnHandle = () => {
    if (isLoading) {
      return;
    }
    Toast.loading({
      message: "Loading",
      duration: 60000,
      overlay: true,
      overlayStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
    });
    write();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePropFetch({
      address,
      cat_token_id: defaultCat,
      prop_token_id: actionKnapsack.token_id,
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="use-modal days-one">
      <Image
        className="close-special-popup"
        src={closeSvg}
        width="46"
        height="46"
        onClick={() => props.closeHandle()}
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
        <div className="flex justify-center items-center h-70px">
          <div
            className="w-267px h-60px relative cursor-pointer flex"
            onClick={burnHandle}
          >
            <Button
              bgColor1="#AAC211"
              bgColor2="#bad60f"
              text="Use"
              size="26px"
              status={isLoading ? 0 : 1}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

let getMybagTimer: any = null;
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

    clearTimeout(getMybagTimer);
    getMybagTimer = setTimeout(() => {
      getInitData();
    }, 5000);
  };

  useEffect(() => {
    getInitData();
    return () => {
      clearTimeout(getMybagTimer);
    };
  }, [address]);

  useActivate(() => {
    getInitData();
  });

  useUnactivate(() => {
    clearTimeout(getMybagTimer);
  });

  const closeHandle = () => {
    setPopup("");
    getInitData();
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
                  <Image
                    className="important-absolute z-2 left-10px bottom-10px"
                    width="34"
                    height="auto"
                    src={knapsack_img[item.use]}
                  />
                  <Image width="100%" height="100%" src={item.image} />
                </div>
                <span className="font-shadow-black">{item.num}</span>
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
        <UseModal
          detailData={actionKnapsack}
          closeHandle={closeHandle}
        ></UseModal>
      </Popup>
    </>
  );
};

export default Knapsack;
