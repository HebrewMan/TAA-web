import { useEffect, useState } from "react";
import "./index.scss";
import { Switch, Image, Popup, Toast } from "react-vant";
import DropDown from "@/components/Dropdown";
import {
  getCatInfo,
  getCatStatus,
  getMyCats,
  startWork,
  stopWork,
} from "@/api/feature/cat";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import device from "current-device";
import backLogo from "@/assets/icon/back.svg";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import AttibuteSmall from "@/components/attributeSmall";
import TopLineImg from "@/assets/bakeground/top-line.svg";
import { Loading } from "react-vant";
import { useActivate, useUnactivate } from "react-activation";
import { useRootDispatch } from "@/store/hooks";
import Button from "@/components/Button/index";
import marketABI from "@/abi/MarketPlaceTAA.json";
import taakABI from "@/abi/taak.json";
import closeSvg from "@/assets/icon/close.svg";
import { payCoins } from "@/api/feature/app";
import { market, taak } from "@/config/constantAddress";
import { ethers } from "ethers";
let marketsList: any = [];
const SellModal = (props: any) => {
  const { address } = useAccount();
  const [marketsOption, setMarketsOption] = useState([]);
  const [optionValue, setOptionValue] = useState(0);
  const [price, setPrice] = useState("");
  const {
    data: marketData,
    isLoading: marketIsLoading,
    isSuccess: marketIsSuccess,
    writeAsync,
  } = useContractWrite({
    address: market,
    abi: marketABI.abi,
    functionName: "createOrder",
  });

  const { data: isApprovedData, isLoading: isApprovedLoading } =
    useContractRead({
      address: taak,
      abi: taakABI,
      functionName: "isApprovedForAll",
      args: [address, market],
    });

  const {
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    writeAsync: approveWriteAsync,
  } = useContractWrite({
    address: taak,
    abi: taakABI,
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
    if (approveSuccess) {
      writeAsync({
        args: [
          props.catInfo.nft_address,
          marketsList[optionValue].coin_address,
          props.catInfo.token_id,
          ethers.parseUnits(price, 6),
        ],
      });
    }
  }, [approveSuccess]);

  const sellHandle = () => {
    if (!price || parseFloat(price) <= 0) {
      Toast.info("请输入价格");
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
    if (approveLoading || marketIsLoading) return;

    if (!isApprovedData) {
      approveWriteAsync({
        args: [market, true],
      });
    } else {
      writeAsync({
        args: [
          props.catInfo.nft_address,
          marketsList[optionValue].coin_address,
          props.catInfo.token_id,
          ethers.parseUnits(price, 6),
        ],
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

const CatDetail = (props: any) => {
  const isMobile = device.mobile();
  const detailData = props.detailData;
  const [catInfo, setCatInfo] = useState({});
  const [popup, setPopup] = useState("");
  const {
    data: marketData,
    isLoading: marketIsLoading,
    isSuccess: marketIsSuccess,
    writeAsync,
  } = useContractWrite({
    address: market,
    abi: marketABI.abi,
    functionName: "cancelOrder",
  });

  useEffect(() => {
    getCatInfo(detailData.token_id).then((res: any) => {
      setCatInfo(res);
    });
  }, [detailData.token_id]);

  const [attibute_list, setAttibute_list] = useState([
    {
      typeImg: staminaSvg,
      gradientBk: "linear-gradient(180deg, #FF8D8D 0%, #C93413 117.9%)",
      value: 100,
    },
    {
      typeImg: charismaSvg,
      gradientBk: "linear-gradient(180deg, #DB8EFF 0%, #6C1794 118.75%)",
      value: 80,
    },
    {
      typeImg: cleanSvg,
      gradientBk: "linear-gradient(180deg, #98CEFF 0%, #0A569D 118.75%)",
      value: 50,
    },
    {
      typeImg: iqSvg,
      gradientBk: "linear-gradient(180deg, #C9F7C2 0%, #3B8734 130%)",
      value: 40,
    },
  ]);

  const getInitData = () => {
    getCatStatus(detailData.token_id).then((res: any) => {
      attibute_list[3].value = res.comfort;
      attibute_list[2].value = res.stamina;
      attibute_list[0].value = res.comfort;
      attibute_list[1].value = res.happiness;
      setAttibute_list([...attibute_list]);
    });
  };

  const closeSelf = () => {
    props.closeHandle();
  };

  useEffect(() => {
    if (marketIsSuccess) {
      closeSelf();
      Toast.success("cancel success");
    }
  }, [marketIsSuccess]);

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

  useEffect(() => {
    if (popup == "") {
      getInitData();
    }
  }, [popup]);

  const openModal = () => {
    if (detailData.is_owners == 0) {
      writeAsync({
        args: [detailData.order_info.order_id],
      });
      return;
    }
    setPopup("sell");
  };

  return (
    <>
      <div className="cat-detail">
        <div className="detail-title">
          {isMobile && (
            <div className="back">
              <Image
                className="back-img"
                width="34"
                height="34"
                src={backLogo}
                onClick={closeSelf}
              />
            </div>
          )}
          <div>Cat detail</div>
        </div>
        <div className="detail-content">
          <Image
            className="top-line-left"
            width="30"
            height="125"
            src={TopLineImg}
          />
          <Image
            className="top-line-right"
            width="30"
            height="125"
            src={TopLineImg}
          />
          <div className="content-border1">
            <div className="img-wrap w-315px h-265px flex justify-center items-center">
              <Image
                className=""
                width="220"
                height="auto"
                src={detailData.image}
              />
            </div>
            <div className="flex items-end line-height-none pt-20px pl-14px">
              <div className=" color-#402209 text-28px">{detailData.name}</div>
              <div className=" text-18px opacity-60 color-#2D1600 ml-8px">
                #001
              </div>
            </div>
            <div className="flex justify-between items-center px-14px">
              <div className=" color-#402209 text-14px text-left  pt-10px">
                ID: {detailData.token_id}
              </div>
            </div>
            <div className="attibute_list flex px-10px justify-between mt-5px">
              {attibute_list.map((item) => (
                <AttibuteSmall
                  logoWidth={25}
                  height={16}
                  typeImg={item.typeImg}
                  gradientBk={item.gradientBk}
                  value={item.value}
                  key={item.typeImg}
                />
              ))}
            </div>
          </div>
          <div className="content-border2"></div>
          <div className="w-330px h-60px relative cursor-pointer mt-460px">
            <Button
              bgColor1="#AAC211"
              bgColor2="#bad60f"
              text={detailData.is_owners == 1 ? "Sell" : "Cancel Sell"}
              size="26px"
              onClick={openModal}
            ></Button>
          </div>
        </div>
      </div>
      <Popup
        visible={popup == "sell"}
        style={{ background: "none", height: "100%" }}
        position="top"
      >
        <SellModal setPopup={setPopup} catInfo={catInfo}></SellModal>
      </Popup>
    </>
  );
};

let getMybagTimer: any = null;
const MyNFT = () => {
  const { address } = useAccount();
  const [myNFTs, setMyNFTS] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState({});
  const dispatch = useRootDispatch();

  const getMyNfts = () => {
    clearTimeout(getMybagTimer);
    getMyCats(address as string).then((res: any) => {
      setMyNFTS(res);
    });

    getMybagTimer = setTimeout(() => {
      getMyNfts();
    }, 5000);
  };

  useEffect(() => {
    getMyNfts();
    return () => {
      clearTimeout(getMybagTimer);
      setShowDetail(false);
    };
  }, []);

  useActivate(() => {
    getMyNfts();
  });

  useUnactivate(() => {
    clearTimeout(getMybagTimer);
    setShowDetail(false);
  });

  const catDetailHandle = (item: any) => {
    setDetailData(item);
    setShowDetail(true);
  };

  return (
    <>
      {showDetail ? (
        <CatDetail detailData={detailData} closeHandle={setShowDetail} />
      ) : (
        <div className="my-nft">
          <div className="main">
            {myNFTs.map((item: any) => (
              <div className="item cursor-pointer" key={item.token_id}>
                <div
                  className="top relative"
                  onClick={() => catDetailHandle(item)}
                >
                  <span className="absolute z-2 left-0px top-0">
                    {item.is_owners == 1 ? "Resting" : "OnSell"}
                  </span>
                  <Image
                    className="important-absolute left-0 top-0"
                    width="135"
                    height="117"
                    src={item.image}
                  />
                </div>
                <div className="bottom">
                  <span className="days-one">{item.name}</span>
                  <span className="days-one">#{item.token_id}</span>
                  {/* <div className="ml-auto">
                    <Switch
                      defaultChecked={item.work_status}
                      size="12px"
                      activeColor="#7AD170"
                      inactiveColor="#935C33"
                      onChange={(val) => switchChange(val, item)}
                    />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyNFT;
