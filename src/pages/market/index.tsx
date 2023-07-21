import React, { useState } from "react";
import "./index.scss";
import { Flex, Toast } from "react-vant";
import DropDown from "@/components/Dropdown";
import mallImg1 from "@/assets/malls/1.svg";
import mallImg2 from "@/assets/malls/2.svg";
import mallImg3 from "@/assets/malls/3.svg";
import mallImg4 from "@/assets/malls/4.svg";
import mallImg5 from "@/assets/malls/5.svg";
import mallImg6 from "@/assets/malls/6.svg";
import token1Img from "@/assets/icon/token1.svg";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import { getMarketsCats } from "@/api/feature/app";

const NFTMarket = () => {
  const isAndroid = /android/i.test(navigator.userAgent);
  const [marketDatas] = useState([
    mallImg1,
    mallImg2,
    mallImg3,
    mallImg4,
    mallImg5,
    mallImg6,
  ]);

  const marketsOption1 = [
    { text: "Kitten", value: 0 },
    { text: "Props", value: 1 },
  ];

  const marketsOption2 = [
    { text: "Common", value: 0 },
    { text: "Rare", value: 1 },
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
        <Flex justify="center" align="center" wrap="wrap">
          {marketDatas.map((item) => (
            <Flex.Item span={12} key={item}>
              <div className="item" onClick={() => Toast("Hello")}>
                <div className="bottom">
                  {/* <img src={item} width={80} alt="" /> */}
                  {isAndroid ? (
                    <img src={item} alt="" />
                  ) : (
                    <object type="image/svg+xml" data={item}></object>
                  )}
                </div>
                <div className="top">
                  <span>Name</span>
                  <span>#001</span>
                </div>
              </div>
              <div className="price">10</div>
              <img src={token1Img} className="token-logo" alt="" />
            </Flex.Item>
          ))}
        </Flex>
      </div>
    </>
  );
};

const NFTAdopt = () => {
  const isAndroid = /android/i.test(navigator.userAgent);
  const [marketDatas] = useState([
    mallImg1,
    mallImg2,
    mallImg3,
    mallImg4,
    mallImg5,
    mallImg6,
  ]);

  const marketsOption1 = [
    { text: "Props", value: 0 },
    { text: "Kitten", value: 1 },
  ];

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
        <Flex justify="center" align="center" wrap="wrap">
          {marketDatas.map((item) => (
            <Flex.Item span={12} key={item}>
              <div className="item" onClick={() => Toast("Hello")}>
                <div className="bottom">
                  {/* <img src={item} width={80} alt="" /> */}
                  {isAndroid ? (
                    <img src={item} alt="" />
                  ) : (
                    <object type="image/svg+xml" data={item}></object>
                  )}
                </div>
                <div className="top">
                  <span>Name</span>
                  <span>#001</span>
                </div>
              </div>
              <div className="price">10</div>
              <img src={token1Img} className="token-logo" alt="" />
            </Flex.Item>
          ))}
        </Flex>
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
