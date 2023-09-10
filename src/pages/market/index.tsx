import { useEffect, useState } from "react";
import "./index.scss";
import DropDown from "@/components/Dropdown";
import { Cell, Image, List, Toast } from "react-vant";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import {
  getMarketsCats,
  getMarketsProp,
  getOrderInfo,
} from "@/api/feature/market";
import device from "current-device";
import { getCatInfo, propDetail } from "@/api/feature/cat";
import backLogo from "@/assets/icon/back.svg";
import AttibuteSmall from "@/components/attributeSmall";
import salarybtnImg from "@/assets/bakeground/salary_btn.svg";
import MarketItem from "@/components/MarketItem";
import taaImg from "@/assets/bakeground/taa.png";
import ethImg from "@/assets/bakeground/eth.png";
import buyTitleImg from "@/assets/bakeground/buy-title.png";
import tradeBtnImg from "@/assets/bakeground/trade-btn.svg";
import TopLineImg from "@/assets/bakeground/top-line.svg";
import { Loading, Popup } from "react-vant";
import closeSvg from "@/assets/icon/close.svg";
import { useRootSelector } from "@/store/hooks";
import { selectAppSlice } from "@/store/slices/appSlice";
import { erc20ABI, useAccount, useContractRead, useContractWrite } from "wagmi";
import { market, taak, ercEth } from "@/config/constantAddress";
import marketABI from "@/abi/MarketPlaceTAA.json";
import failImg from "@/assets/icon/fail.svg";
import successImg from "@/assets/icon/success.svg";
import taakABI from "@/abi/taak.json";
import { useActivate, useUnactivate } from "react-activation";
import { ethers } from "ethers";
const BuyModal = (props: any) => {
  const { address } = useAccount();

  const {
    data: marketData,
    isLoading: marketIsLoading,
    isSuccess: marketIsSuccess,
    writeAsync: marketWriteAsync,
  } = useContractWrite({
    address: market,
    abi: marketABI.abi,
    functionName: "buyOrder",
  });

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
    if (!!marketWriteAsync) {
      marketWriteAsync({
        args: [props.orderInfo.order_id],
        value: ethers.parseUnits(props.orderInfo.pay_amount, 18),
      });
    }
  }, [marketWriteAsync]);
  return (
    <div className="buy-modal days-one">
      <Image
        className="close-special-popup"
        src={closeSvg}
        width="46"
        height="46"
        onClick={() => props.closeHandle("")}
      />
      <div className="detail-title">
        <Image width="200" height="auto" src={buyTitleImg} />
      </div>
      <div className="modal-content">
        {marketIsLoading ? (
          <>
            <Loading color="#402209" size="50px" />
            <span>Loading</span>
          </>
        ) : marketIsSuccess ? (
          <Image width="50" height="auto" src={successImg} />
        ) : (
          <Image width="50" height="auto" src={failImg} />
        )}
      </div>
      <div
        className="w-215px h-60px relative cursor-pointer mt-50px "
        onClick={() => props.closeHandle("")}
      >
        <Image
          className="absolute left-0"
          width="215"
          height="auto"
          src={tradeBtnImg}
        />
        <i className="absolute top-27px text-after text-26px font-shadow-black2">
          {marketIsLoading ? ". . ." : "OK"}
        </i>
      </div>
    </div>
  );
};

const MarketDetail = (props: { detailData: any; closeHandle: any }) => {
  const { isLogin } = useRootSelector(selectAppSlice);
  const isMobile = device.mobile();
  const detailData = props.detailData;
  const [popup, setPopup] = useState("");
  const [catInfo, setCatInfo] = useState({});
  const [attibute_list, setAttibute_list] = useState([
    {
      typeImg: staminaSvg,
      gradientBk: "linear-gradient(180deg, #FF8D8D 0%, #C93413 117.9%)",
      value: 0,
    },
    {
      typeImg: charismaSvg,
      gradientBk: "linear-gradient(180deg, #DB8EFF 0%, #6C1794 118.75%)",
      value: 0,
    },
    {
      typeImg: cleanSvg,
      gradientBk: "linear-gradient(180deg, #98CEFF 0%, #0A569D 118.75%)",
      value: 0,
    },
    {
      typeImg: iqSvg,
      gradientBk: "linear-gradient(180deg, #C9F7C2 0%, #3B8734 130%)",
      value: 0,
    },
  ]);

  const initData = () => {
    if (!detailData.token_id) return;
    getCatInfo(detailData.token_id).then((res: any) => {
      attibute_list[3].value = res.comfort || 0;
      attibute_list[2].value = res.stamina || 0;
      attibute_list[0].value = res.health || 0;
      attibute_list[1].value = res.happiness || 0;
      setAttibute_list([...attibute_list]);
      setCatInfo(res);
    });
  };

  useEffect(() => {
    initData();
  }, [detailData]);

  const closeSelf = () => {
    props.closeHandle("");
  };

  return (
    <div className="market-cat-detail">
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
      <div className="detail-content days-one">
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
        </div>
        <div className="content-border2">
          <div className="flex items-end line-height-none pt-20px pl-14px">
            <div className=" color-#402209 text-28px">{detailData.name}</div>
            {/* <div className=" text-18px opacity-60 color-#2D1600 ml-8px">
              #001
            </div> */}
          </div>
          <div className="flex justify-between items-center px-14px">
            <div className=" color-#402209 text-14px text-left  pt-10px">
              ID: {detailData.token_id}
            </div>
            <div className="text-14px color-#402209 flex">
              Owmed by
              <div className="w-57px text-ellipsis overflow-hidden color-#0A5CA7 ml-5px">
                {detailData.owner}
              </div>
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
        <div className="current-price px-18px py-10px">
          <div className="text-16px color-#402209">Current price</div>
          <div className="wrap-sign flex important-justify-center">
            <div className="relative">
              <Image
                className="important-absolute left--20px top--7px"
                width="48"
                height="45"
                src={ethImg}
              />
              <div className="sign-box days-one important-w-150px">
                {detailData.pay_amount}{" "}
              </div>
            </div>
          </div>
        </div>
        {isLogin && (
          <div
            className="w-330px h-60px relative cursor-pointer mt-30px "
            onClick={() => setPopup("buy")}
          >
            <Image
              className="absolute left-0"
              width="330"
              height="auto"
              src={salarybtnImg}
            />
            <i className="absolute top-33px text-after text-26px font-shadow-black2">
              Buy
            </i>
          </div>
        )}
      </div>

      <Popup
        visible={popup == "buy"}
        style={{ background: "none", height: "100%" }}
        position="top"
      >
        <BuyModal orderInfo={detailData} closeHandle={setPopup}></BuyModal>
      </Popup>
    </div>
  );
};

const AdoptDetail = (props: any) => {
  const detailData = props.detailData;
  const isMobile = device.mobile();
  const [popup, setPopup] = useState("");

  const closeSelf = () => {
    props.closeHandle("");
  };
  return (
    <div className="use-box flex flex-col items-center pt-70px">
      {isMobile && (
        <div className="back">
          <img
            src={backLogo}
            width={34}
            height={34}
            alt=""
            onClick={closeSelf}
          />
        </div>
      )}

      <div className="use-box-wrap">
        <div className="wrap-img w-300px h-270px flex justify-center items-center">
          <Image width="176" height="auto" src={detailData.image} />
        </div>
        <div className="wrap-sign ">
          <div className="relative">
            <Image
              className="important-absolute left--30px top--10px"
              width="50"
              height="50"
              src={ethImg}
            />
            <div className="sign-box days-one">{detailData.pay_amount}</div>
          </div>
        </div>
      </div>
      <div
        className="w-300px h-60px relative use-btn cursor-pointer"
        onClick={() => setPopup("buy")}
      >
        <Image
          className="important-absolute left-0"
          width="300"
          height="auto"
          src={salarybtnImg}
        />
        <i className="absolute z-2 top-28px  text-after text-20px font-shadow-black">
          Adopt
        </i>
      </div>

      <Popup
        visible={popup == "buy"}
        style={{ background: "none", height: "100%" }}
        position="top"
      >
        <BuyModal orderInfo={detailData} closeHandle={setPopup}></BuyModal>
      </Popup>
    </div>
  );
};

let marketTimer: any = null;
const marketsOption1 = [
  { text: "Common", value: 1 },
  { text: "Rare", value: 2 },
  { text: "Super", value: 3 },
];

const marketsOption2 = [
  {
    text: (
      <div className="flex items-center">
        <span className="ml-4px">All</span>
      </div>
    ),
    value: "all",
  },
  {
    text: (
      <div className="flex items-center">
        <img className="w-20px h-20px" src={staminaSvg} />
        <span className="ml-4px">Health</span>
      </div>
    ),
    value: "health",
  },
  {
    text: (
      <div className="flex items-center">
        <img className="w-20px h-20px" src={charismaSvg} />
        <span className="ml-4px">Happiness</span>
      </div>
    ),
    value: "happiness",
  },
  {
    text: (
      <div className="flex items-center">
        <img className="w-20px h-20px" src={cleanSvg} />
        <span className="ml-4px">Stamina</span>
      </div>
    ),
    value: "stamina",
  },
  {
    text: (
      <div className="flex items-center">
        <img className="w-20px h-20px" src={iqSvg} />
        <span className="ml-4px">Comfort</span>
      </div>
    ),
    value: "comfort",
  },
];
const NFTMarket = (props: {
  openHandle: any;
  setDetailData: (arg0: Record<string, string | number>) => void;
}) => {
  const [marketData, setmarketData] = useState<
    Array<Record<string, string | number>>
  >([]);
  const [count, setCount] = useState(1);
  const [finished, setFinished] = useState<boolean>(false);
  const [optionValue1, setOptionValue1] = useState(1);
  const [optionValue2, setOptionValue2] = useState("all");
  const marketsOption1 = [
    { text: "Common", value: 1 },
    { text: "Rare", value: 2 },
  ];

  const fetHandle = (refresh = false) => {
    getMarketsCats({
      page: 1,
      rate: optionValue1,
      use: optionValue2,
    }).then((res: any) => {
      if (marketData.length == 0 || refresh) {
        setmarketData(res);
        return;
      }
      let newObj: any = {};
      res.forEach((item: any) => {
        newObj[item.token_id] = item;
      });

      for (let i = 0; i < marketData.length; i++) {
        if (!newObj[marketData[i].token_id]) {
          setmarketData([...marketData, newObj[marketData[i].token_id]]);
        }
      }
    });
  };
  const getInitData = () => {
    clearTimeout(marketTimer);
    marketTimer = setTimeout(() => {
      fetHandle();
      getInitData();
    }, 5000);
  };

  const onLoad = async () => {
    setCount((v) => v + 1);
    let result: any = await getMarketsCats({
      page: count,
      rate: optionValue1,
      use: optionValue2,
    });
    if (result.length == 0) {
      setFinished(true);
    } else {
      if (marketData.length == 0) {
        setmarketData(result);
        return;
      }
      let newObj: any = {};
      result.forEach((item: any) => {
        newObj[item.token_id] = item;
      });
      for (let i = 0; i < marketData.length; i++) {
        if (!newObj[marketData[i].token_id]) {
          setmarketData([...marketData, newObj[marketData[i].token_id]]);
        }
      }
    }
  };

  useEffect(() => {
    setmarketData([]);
    fetHandle(true);
  }, [optionValue1, optionValue2]);

  useEffect(() => {
    getInitData();
    return () => {
      clearTimeout(marketTimer);
    };
  }, []);

  useActivate(() => {
    getInitData();
  });

  useUnactivate(() => {
    clearTimeout(marketTimer);
  });

  const openHandle = (data: Record<string, string | number>) => {
    props.openHandle("market");
    props.setDetailData(data);
  };

  return (
    <>
      <div className="metu">
        <div className="lang-btn">
          <div className="lang-shadow">
            <DropDown
              defaultValue={optionValue1}
              option={marketsOption1}
              setOption={setOptionValue1}
            ></DropDown>
          </div>
        </div>
      </div>

      <div className="items">
        <List
          finished={finished}
          errorText="Request failed, click to reload"
          onLoad={onLoad}
          loadingText="Loading..."
          className="flex justify-between flex-wrap line-height-none w-full"
        >
          {marketData.map((item) => (
            <div key={item.order_id} onClick={() => openHandle(item)}>
              <MarketItem item={item}></MarketItem>
            </div>
          ))}
        </List>
      </div>
    </>
  );
};

let adoptTimer: any = null;
const NFTAdopt = (props: {
  openHandle: any;
  setDetailData: (arg0: Record<string, string | number>) => void;
}) => {
  const [marketData, setmarketData] = useState<
    Array<Record<string, string | number>>
  >([]);
  const [count, setCount] = useState(1);
  const [finished, setFinished] = useState<boolean>(false);
  const [optionValue1, setOptionValue1] = useState(1);
  const [optionValue2, setOptionValue2] = useState("all");

  const fetHandle = (refresh = false) => {
    getMarketsProp({
      page: 1,
      rate: optionValue1,
      use: optionValue2,
    }).then((res: any) => {
      if (marketData.length == 0 || refresh) {
        setmarketData(res);
        return;
      }
      let newObj: any = {};
      res.forEach((item: any) => {
        newObj[item.token_id] = item;
      });

      for (let i = 0; i < marketData.length; i++) {
        if (!newObj[marketData[i].token_id]) {
          setmarketData([...marketData, newObj[marketData[i].token_id]]);
        }
      }
    });
  };

  const getInitData = () => {
    clearTimeout(marketTimer);
    marketTimer = setTimeout(() => {
      fetHandle();
      getInitData();
    }, 5000);
  };

  const onLoad = async () => {
    setCount((v) => v + 1);
    let result: any = await getMarketsProp({
      page: count,
      rate: optionValue1,
      use: optionValue2,
    });
    if (result.length == 0) {
      setFinished(true);
    } else {
      if (marketData.length == 0) {
        setmarketData(result);
        return;
      }
      let newObj: any = {};
      result.forEach((item: any) => {
        newObj[item.token_id] = item;
      });
      for (let i = 0; i < marketData.length; i++) {
        if (!newObj[marketData[i].token_id]) {
          setmarketData([...marketData, newObj[marketData[i].token_id]]);
        }
      }
    }
  };

  useEffect(() => {
    setmarketData([]);
    fetHandle(true);
  }, [optionValue1, optionValue2]);

  useEffect(() => {
    getInitData();
    return () => {
      clearTimeout(adoptTimer);
    };
  }, []);

  useActivate(() => {
    getInitData();
  });

  useUnactivate(() => {
    clearTimeout(adoptTimer);
  });

  const openHandle = (data: Record<string, string | number>) => {
    props.openHandle("adopt");
    props.setDetailData(data);
  };

  return (
    <>
      <div className="metu">
        <div className="lang-btn">
          <div className="lang-shadow">
            <DropDown
              defaultValue={optionValue1}
              option={marketsOption1}
              setOption={setOptionValue1}
            ></DropDown>
          </div>
        </div>

        <div className="important-w-140px lang-btn">
          <div className="lang-shadow">
            <DropDown
              defaultValue={optionValue2}
              option={marketsOption2}
              setOption={setOptionValue2}
            ></DropDown>
          </div>
        </div>
      </div>

      <div className="items">
        <List
          finished={finished}
          errorText="Request failed, click to reload"
          onLoad={onLoad}
          loadingText="Loading..."
          className="flex justify-between flex-wrap line-height-none w-full"
        >
          {marketData.map((item) => (
            <div key={item.order_id} onClick={() => openHandle(item)}>
              <MarketItem item={item}></MarketItem>
            </div>
          ))}
        </List>
      </div>
    </>
  );
};

const Market = () => {
  const [type, setType] = useState("Market");
  const [showDetail, setShowDetail] = useState("");
  const [detailData, setDetailData] = useState({});

  useUnactivate(() => {
    setShowDetail("");
    setDetailData({});
  });

  useEffect(() => {
    return () => {
      setShowDetail("");
      setDetailData({});
    };
  }, []);

  return (
    <>
      {showDetail == "market" && (
        <div className="h-full">
          <MarketDetail
            detailData={detailData}
            closeHandle={setShowDetail}
          ></MarketDetail>
        </div>
      )}

      <div
        className="market"
        style={{ display: !showDetail ? "block" : "none" }}
      >
        <div className="main">
          <div className="nav">
            <div
              className={`${type == "Market" && "outer-ring"} type`}
              onClick={() => setType("Market")}
            >
              <div className="text">Kitten</div>
            </div>
            <div
              className={`${type == "Adopt" && "outer-ring"} type`}
              onClick={() => setType("Adopt")}
            >
              <div className="text">Prop</div>
            </div>
          </div>
          <div
            style={{ display: type == "Market" ? "flex" : "none" }}
            className="metu-box"
          >
            <NFTMarket
              openHandle={setShowDetail}
              setDetailData={setDetailData}
            ></NFTMarket>
          </div>
          <div
            style={{ display: type == "Adopt" ? "flex" : "none" }}
            className="metu-box"
          >
            <NFTAdopt
              openHandle={setShowDetail}
              setDetailData={setDetailData}
            ></NFTAdopt>
          </div>
        </div>
      </div>
      {showDetail == "adopt" && (
        <div className="h-full">
          <AdoptDetail
            detailData={detailData}
            closeHandle={setShowDetail}
          ></AdoptDetail>
        </div>
      )}
    </>
  );
};

export default Market;
