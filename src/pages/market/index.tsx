import { useEffect, useState } from "react";
import "./index.scss";
import DropDown from "@/components/Dropdown";
import { Image } from "react-vant";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import { getMarketsCats, getMarketsProp } from "@/api/feature/market";
import device from "current-device";
import { getCatStatus } from "@/api/feature/cat";
import backLogo from "@/assets/icon/back.svg";
import AttibuteSmall from "@/components/attributeSmall";
import salarybtnImg from "@/assets/bakeground/salary_btn.svg";
import MarketItem from "@/components/MarketItem";
import experienceImg from "@/assets/bakeground/experience.svg";
import priceImg from "@/assets/bakeground/price.svg";
import buyTitleImg from "@/assets/bakeground/buy-title.png";
import tradeBtnImg from "@/assets/bakeground/trade-btn.svg";
import TopLineImg from "@/assets/bakeground/top-line.svg";
import { Loading, Popup } from "react-vant";
import closeSvg from "@/assets/icon/close.svg";
const BuyModal = (props) => {
  return (
    <div className="buy-modal days-one">
      <Image
        className="close-special-popup"
        src={closeSvg}
        width="46"
        height="46"
        onClick={props.onClose}
      />
      <div className="detail-title">
        <Image width="200" height="auto" src={buyTitleImg} />
      </div>
      <div className="modal-content">
        <Loading color="#402209" size="50px" />
        <span>Loading</span>
      </div>
      <div className="w-215px h-60px relative cursor-pointer mt-50px ">
        <Image
          className="absolute left-0"
          width="215"
          height="auto"
          src={tradeBtnImg}
        />
        <i className="absolute top-27px text-after text-26px font-shadow-black2">
          OK
        </i>
      </div>
    </div>
  );
};

const MarketDetail = (props: { detailData: any; closeHandle: any }) => {
  const isMobile = device.mobile();
  const detailData = props.detailData;

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

  const initData = () => {
    if (!detailData.token_id) return;
    getCatStatus(detailData.token_id).then((res: any) => {
      attibute_list[3].value = res.intellect;
      attibute_list[2].value = res.stamina;
      attibute_list[0].value = res.comfort;
      attibute_list[1].value = res.charm;
      setAttibute_list([...attibute_list]);
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
            <div className=" text-18px opacity-60 color-#2D1600 ml-8px">
              #001
            </div>
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
          <div className="wrap-sign ">
            <div className="relative">
              <Image
                className="absolute left--20px top--7px"
                width="45"
                height="45"
                src={experienceImg}
              />
              <div className="sign-box">10</div>
            </div>
            <div className="relative">
              <Image
                className="absolute left--20px top--7px"
                width="45"
                height="45"
                src={priceImg}
              />
              <div className="sign-box days-one">10</div>
            </div>
          </div>
        </div>
        <div className="w-330px h-60px relative cursor-pointer mt-30px ">
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
      </div>
    </div>
  );
};

const AdoptDetail = (props) => {
  const detailData = props.detailData;
  const isMobile = device.mobile();
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
              className="absolute left--30px top--10px"
              width="50"
              height="50"
              src={experienceImg}
            />
            <div className="sign-box days-one">10</div>
          </div>
        </div>
      </div>
      <div className="w-300px h-60px relative use-btn cursor-pointer">
        <Image
          className="absolute left-0"
          width="300"
          height="auto"
          src={salarybtnImg}
        />
        <i className="absolute z-2 top-28px  text-after text-20px font-shadow-black">
          Adopt
        </i>
      </div>
    </div>
  );
};

const NFTMarket = (props: {
  openHandle: any;
  setDetailData: (arg0: Record<string, string | number>) => void;
}) => {
  const [marketData, setmarketData] = useState<
    Array<Record<string, string | number>>
  >([]);

  const marketsOption1 = [
    { text: "Kitten", value: 0 },
    { text: "Props", value: 1 },
  ];

  const marketsOption2 = [
    { text: "Common", value: 0 },
    { text: "Rare", value: 1 },
  ];

  const getInitData = () => {
    getMarketsCats().then((res: any) => {
      console.log(res);
      setmarketData(res);
    });
  };

  useEffect(() => {
    getInitData();
  }, []);

  const openHandle = (data: Record<string, string | number>) => {
    props.openHandle("market");
    props.setDetailData(data);
  };

  const [optionValue1, setOptionValue1] = useState(0);
  const [optionValue2, setOptionValue2] = useState(0);
  return (
    <>
      <div className="metu">
        <div className="lang-btn">
          <div className="lang-shadow">
            <DropDown
              option={marketsOption1}
              setOption={setOptionValue1}
            ></DropDown>
          </div>
        </div>

        <div className="lang-btn">
          <div className="lang-shadow">
            <DropDown
              option={marketsOption2}
              setOption={setOptionValue2}
            ></DropDown>
          </div>
        </div>
      </div>

      <div className="items">
        <div className="flex justify-between flex-wrap line-height-none">
          {marketData.map((item) => (
            <div key={item.token_id} onClick={() => openHandle(item)}>
              <MarketItem item={item}></MarketItem>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const NFTAdopt = (props: {
  openHandle: any;
  setDetailData: (arg0: Record<string, string | number>) => void;
}) => {
  const [marketData, setmarketData] = useState<
    Array<Record<string, string | number>>
  >([]);

  const marketsOption1 = [
    { text: "Props", value: 0 },
    { text: "Kitten", value: 1 },
  ];

  const getInitData = () => {
    getMarketsProp().then((res: any) => {
      console.log(res);
      setmarketData(res);
    });
  };

  useEffect(() => {
    getInitData();
  }, []);

  const openHandle = (data: Record<string, string | number>) => {
    props.openHandle("adopt");
    props.setDetailData(data);
  };

  const marketsOption2 = [
    {
      text: (
        <div className="flex items-center">
          <img className="w-20px h-20px" src={staminaSvg} />
          <span className="ml-4px">Charm</span>
        </div>
      ),
      value: 0,
    },
    {
      text: (
        <div className="flex items-center">
          <img className="w-20px h-20px" src={charismaSvg} />
          <span className="ml-4px">stamina</span>
        </div>
      ),
      value: 1,
    },
    {
      text: (
        <div className="flex items-center">
          <img className="w-20px h-20px" src={cleanSvg} />
          <span className="ml-4px">intelligence</span>
        </div>
      ),
      value: 2,
    },
    {
      text: (
        <div className="flex items-center">
          <img className="w-20px h-20px" src={iqSvg} />
          <span className="ml-4px">cleanness</span>
        </div>
      ),
      value: 3,
    },
  ];

  const [optionValue1, setOptionValue1] = useState(0);
  const [optionValue2, setOptionValue2] = useState(0);
  return (
    <>
      <div className="metu">
        <div className="lang-btn">
          <div className="lang-shadow">
            <DropDown
              option={marketsOption1}
              setOption={setOptionValue1}
            ></DropDown>
          </div>
        </div>

        <div className="important-w-140px lang-btn">
          <div className="lang-shadow">
            <DropDown
              option={marketsOption2}
              setOption={setOptionValue2}
            ></DropDown>
          </div>
        </div>
      </div>

      <div className="items">
        <div className="flex justify-between flex-wrap">
          {marketData.map((item) => (
            <div key={item.token_id} onClick={() => openHandle(item)}>
              <MarketItem item={item}></MarketItem>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const MyNFT = () => {
  const [type, setType] = useState("Market");
  const [showDetail, setShowDetail] = useState("");
  const [detailData, setDetailData] = useState({});
  const [popup, setPopup] = useState("");

  return (
    <>
      <div
        style={{ display: showDetail == "market" ? "block" : "none" }}
        className="h-full"
      >
        <MarketDetail
          detailData={detailData}
          closeHandle={setShowDetail}
        ></MarketDetail>
      </div>
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
              <div className="text ">Market</div>
            </div>
            <div
              className={`${type == "Adopt" && "outer-ring"} type`}
              onClick={() => setType("Adopt")}
            >
              <div className="text">Adopt</div>
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
      <div
        style={{ display: showDetail == "adopt" ? "block" : "none" }}
        className="h-full"
      >
        <AdoptDetail
          detailData={detailData}
          closeHandle={setShowDetail}
        ></AdoptDetail>
      </div>
      <Popup
        visible={popup == "buy"}
        style={{ background: "none", height: "100%" }}
        position="top"
      >
        <BuyModal
          detailData={detailData}
          closeHandle={setShowDetail}
        ></BuyModal>
      </Popup>
    </>
  );
};

export default MyNFT;
