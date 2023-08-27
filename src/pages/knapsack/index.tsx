import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import backLogo from "@/assets/icon/back.svg";
import { Image, Popup, Toast, Loading } from "react-vant";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import paginationImg from "@/assets/icon/pagination.svg";
import { getMybag, payCoins, useProp as usePropFetch } from "@/api/feature/app";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import device from "current-device";
import closeSvg from "@/assets/icon/close.svg";
import taapAbi from "@/abi/taap.json";
import Button from "@/components/Button/index";
import { useRootSelector } from "@/store/hooks";
import { selectCatSlice } from "@/store/slices/catSlice";
import { useActivate, useUnactivate } from "react-activation";
import { market, taap } from "@/config/constantAddress";
import marketABI from "@/abi/MarketPlaceTAA.json";
import DropDown from "@/components/Dropdown";
import { ethers } from "ethers";
import { propDetail } from "@/api/feature/cat";
import { parseEther } from "viem";
const knapsack_img: any = {
  stamina: cleanSvg,
  happiness: charismaSvg,
  health: staminaSvg,
  comfort: iqSvg,
};
let marketsList: any = [];
const SellModal = (props: any) => {
  const { address } = useAccount();
  const [marketsOption, setMarketsOption] = useState([]);
  const [optionValue, setOptionValue] = useState(0);
  const [price, setPrice] = useState("");
  const [isSell, setIsSell] = useState(false);
  const {
    data: marketData,
    isLoading: marketIsLoading,
    isSuccess: marketIsSuccess,
    isError: marketIsError,
    writeAsync,
  } = useContractWrite({
    address: market,
    abi: marketABI.abi,
    functionName: "createOrder",
  });

  const { data: isApprovedData, isLoading: isApprovedLoading } =
    useContractRead({
      address: taap,
      abi: taapAbi,
      functionName: "isApprovedForAll",
      args: [address, market],
      watch: true,
      enabled: !!address,
    });

  const {
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    isError: approveError,
    writeAsync: approveWriteAsync,
  } = useContractWrite({
    address: taap,
    abi: taapAbi,
    functionName: "setApprovalForAll",
  });

  const getInitData = () => {
    payCoins().then((res: any) => {
      let result: any = [];
      marketsList = res;
      res.forEach((item: any, index: number) => {
        result.push({
          text: (
            <div className="flex items-center">
              <Image width="20" height="20" src={item.image} />
              <span className="ml-4px">{item.coin}</span>
            </div>
          ),
          value: index,
        });
      });
      setMarketsOption(result);
    });
  };

  useEffect(() => {
    getInitData();
  }, []);

  useEffect(() => {
    if (marketIsSuccess) {
      props.setPopup("");
      Toast.clear();
    }
  }, [marketIsSuccess]);

  useEffect(() => {
    if (marketIsError || approveError) {
      Toast.clear();
    }
  }, [marketIsError, approveError]);

  useEffect(() => {
    if (isApprovedData && isSell) {
      writeAsync({
        args: [
          props.propInfo.prop_address,
          marketsList[optionValue].coin_address,
          props.propInfo.token_id,
          ethers.parseUnits(price, 18),
        ],
      });
    }
  }, [isApprovedData, isSell]);

  const sellHandle = () => {
    if (!price || parseFloat(price) <= 0) {
      Toast.info("请输入价格");
      return;
    }
    setIsSell(true);

    Toast.loading({
      message: "Loading",
      duration: 60000,
      overlay: true,
      overlayStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
    });
    if (approveLoading || marketIsLoading) return;

    if (!isApprovedData) {
      approveWriteAsync({
        args: [market, true],
      });
    }
  };

  return (
    <div className="sell-modal days-one">
      <Image
        className="close-special-popup"
        src={closeSvg}
        width="46"
        height="46"
        onClick={() => props.setPopup("")}
      />
      <div className="detail-title w-200px h-55px">
        <Button
          bgColor1="#a44513"
          bgColor2="#c6601d"
          text="Sell"
          size="24px"
        ></Button>
      </div>
      {marketIsLoading ? (
        <div className="modal-content">
          <Loading color="#402209" size="50px" />
          <span>Loading</span>
        </div>
      ) : (
        <div className="sell-input">
          <input
            type="number"
            value={price}
            onChange={(e: any) => setPrice(e.target.value)}
            placeholder="Please enter"
          />
          <div className="lang-shadow">
            <DropDown
              option={marketsOption}
              setOption={setOptionValue}
            ></DropDown>
          </div>
        </div>
      )}
      <div className="w-215px h-60px relative cursor-pointer mt-50px ">
        <Button
          bgColor1="#AAC211"
          bgColor2="#bad60f"
          text="Confirm"
          size="26px"
          status={approveLoading || marketIsLoading ? 0 : 1}
          onClick={sellHandle}
        ></Button>
      </div>
    </div>
  );
};
const UseModal = (props: any) => {
  const actionKnapsack = props.detailData;
  const { address } = useAccount();
  const { defaultCat } = useRootSelector(selectCatSlice);
  const [popup, setPopup] = useState("");
  const [propInfo, setPropInfo] = useState({});
  const {
    data: burnData,
    isLoading: burnIsLoading,
    isSuccess: burnIsSuccess,
    write: burnWrite,
  } = useContractWrite({
    address: taap,
    abi: taapAbi,
    functionName: "burn",
    args: [address, actionKnapsack.token_id, 1],
  });

  const {
    data: marketData,
    isLoading: marketIsLoading,
    isSuccess: marketIsSuccess,
    writeAsync: marketWriteAsync,
  } = useContractWrite({
    address: market,
    abi: marketABI.abi,
    functionName: "cancelOrder",
  });

  useEffect(() => {
    if (burnIsSuccess) {
      Toast.clear();
      props.closeHandle();
    }
    if (burnIsLoading) {
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
  }, [burnData, burnIsLoading, burnIsSuccess]);

  useEffect(() => {
    propDetail(props.detailData.token_id).then((res) => {
      setPropInfo(res);
    });
  }, []);

  useEffect(() => {
    if (marketIsLoading) {
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
  }, [marketIsLoading]);

  const burnHandle = () => {
    if (burnIsLoading) {
      return;
    }
    burnWrite();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePropFetch({
      address,
      cat_token_id: defaultCat,
      prop_token_id: actionKnapsack.token_id,
    }).then((res) => {
      console.log(res);
    });
  };

  const sellHandle = () => {
    if (actionKnapsack.is_owners == 0) {
      marketWriteAsync({
        args: [actionKnapsack.order_info.order_id],
      });
    } else {
      setPopup("sell");
    }
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
            className="w-130px h-50px relative cursor-pointer flex mr-10px"
            onClick={burnHandle}
          >
            <Button
              bgColor1="#AAC211"
              bgColor2="#bad60f"
              text="Use"
              size="26px"
              status={burnIsLoading ? 0 : 1}
            ></Button>
          </div>
          <div
            className="w-130px h-50px relative cursor-pointer flex"
            onClick={sellHandle}
          >
            <Button
              bgColor1="#AAC211"
              bgColor2="#bad60f"
              text={actionKnapsack.is_owners ? "Sell" : "Cancel"}
              size="26px"
              status={1}
            ></Button>
          </div>
        </div>
      </div>
      <Popup
        visible={popup == "sell"}
        style={{ background: "none", height: "100%" }}
        position="top"
      >
        <SellModal setPopup={setPopup} propInfo={propInfo}></SellModal>
      </Popup>
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
