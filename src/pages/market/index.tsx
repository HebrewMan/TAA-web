import React, { useEffect, useState } from "react";
import "./index.scss";
import { Flex, Toast } from "react-vant";
import DropDown from "@/components/Dropdown";
import { Image } from "react-vant";
import token1Img from "@/assets/icon/token1.svg";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import { getMarketsCats, getMarketsProp } from "@/api/feature/market";

const NFTMarket = () => {
  const isAndroid = /android/i.test(navigator.userAgent);
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
        <div className="flex justify-between flex-wrap">
          {marketData.map((item) => (
            <div key={item.token_id}>
              <div className="item" onClick={() => Toast("Hello")}>
                <div className="bottom">
                  <Image
                    width="100%"
                    height="100%"
                    lazyload
                    src={item.image as string}
                  />
                </div>
                <div className="top">
                  <span>{item.name}</span>
                  <span>#001</span>
                </div>
              </div>
              <div className="price">10</div>
              <img src={token1Img} className="token-logo" alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const NFTAdopt = () => {
  const isAndroid = /android/i.test(navigator.userAgent);
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
        <div className="flex justify-between flex-wrap">
          {marketData.map((item) => (
            <div key={item.token_id}>
              <div className="item" onClick={() => Toast("Hello")}>
                <div className="bottom">
                  <Image
                    lazyload
                    width="100%"
                    height="100%"
                    src={item.image as string}
                  />
                </div>
                <div className="top">
                  <span>{item.name}</span>
                  <span>#001</span>
                </div>
              </div>
              <div className="price">10</div>
              <img src={token1Img} className="token-logo" alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const MyNFT = () => {
  const [type, setType] = useState("Market");

  return (
    <>
      <div className="market">
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
            <NFTMarket></NFTMarket>
          </div>
          <div
            style={{ display: type == "Adopt" ? "flex" : "none" }}
            className="metu-box"
          >
            <NFTAdopt></NFTAdopt>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyNFT;
