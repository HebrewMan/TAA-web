import { useEffect, useState } from "react";
import "./index.scss";
import { Switch } from "react-vant";
import { Image } from "react-vant";
import {
  getCatStatus,
  getMyCats,
  selectCat,
  startWork,
} from "@/api/feature/cat";
import { useAccount } from "wagmi";
import device from "current-device";
import backLogo from "@/assets/icon/back.svg";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import AttibuteSmall from "@/components/attributeSmall";
import salarybtnImg from "@/assets/bakeground/salary_btn.svg";
import buyTitleImg from "@/assets/bakeground/buy-title.png";
import TopLineImg from "@/assets/bakeground/top-line.svg";
import { Loading } from "react-vant";
import { useActivate, useUnactivate } from "react-activation";
import { useRootDispatch } from "@/store/hooks";
import { setDefaultCat } from "@/store/slices/catSlice";

const BuyModal = () => {
  return (
    <div className="buy-modal">
      <div className="detail-title">
        <Image
          className="mt-20px"
          width="260"
          height="auto"
          src={buyTitleImg}
        />
      </div>
    </div>
  );
};

const CatDetail = (props: any) => {
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

  const getInitData = () => {
    getCatStatus(detailData.token_id).then((res: any) => {
      attibute_list[3].value = res.comfort;
      attibute_list[2].value = res.stamina;
      attibute_list[0].value = res.comfort;
      attibute_list[1].value = res.happiness;
      setAttibute_list([...attibute_list]);
    });
  };

  useEffect(() => {
    getInitData();
  }, []);

  const closeSelf = () => {
    props.closeHandle();
  };

  return (
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
        <div className="w-330px h-60px relative cursor-pointer mt-490px ">
          <Image
            className="absolute left-0"
            width="330"
            height="auto"
            src={salarybtnImg}
          />
          <i className="absolute top-33px text-after text-26px font-shadow-black2">
            Sell
          </i>
        </div>
      </div>
    </div>
  );
};

let getMybagTimer = null;
const MyNFT = () => {
  const { address } = useAccount();
  const [myNFTs, setMyNFTS] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState({});
  const dispatch = useRootDispatch();

  const switchChange = (val: boolean, item: any) => {
    if (val) {
      startWork({
        address,
        token_id: item.token_id,
      }).then((res: any) => {});
    }
  };

  const getMyNfts = () => {
    getMyCats(address as string).then((res: any) => {
      console.log(res);
      setMyNFTS(res);
    });
    clearTimeout(getMybagTimer);
    getMybagTimer = setTimeout(() => {
      getMyNfts();
    }, 10000);
  };

  useEffect(() => {
    getMyNfts();
  }, []);

  useActivate(() => {
    getMyNfts();
  });

  useUnactivate(() => {
    clearTimeout(getMybagTimer);
  });

  const catDetailHandle = (item: any) => {
    setDetailData(item);
    setShowDetail(true);
  };

  const selectCathandle = (tokenid) => {
    selectCat({ address, tokenid }).then((res) => {
      dispatch(setDefaultCat(tokenid));
    });
  };

  return (
    <>
      {showDetail ? (
        <CatDetail detailData={detailData} closeHandle={setShowDetail} />
      ) : (
        <div className="my-nft">
          <div className="main">
            {myNFTs.map((item: any) => (
              <div
                className="item cursor-pointer"
                key={item.token_id}
                onClick={() => selectCathandle(item.token_id)}
              >
                <div
                  className="top relative"
                  onClick={() => catDetailHandle(item)}
                >
                  <span className="absolute z-2 left-0px top-0">Resting</span>
                  <Image
                    className="important-absolute left-0 top-0"
                    width="135"
                    height="117"
                    src={item.image}
                  />
                </div>
                <div className="bottom">
                  <span className="days-one">{item.name}</span>
                  <span className="days-one">#001</span>
                  <div className="ml-auto">
                    <Switch
                      defaultChecked={item.work_status}
                      size="12px"
                      activeColor="#7AD170"
                      inactiveColor="#935C33"
                      onChange={(val) => switchChange(val, item)}
                    />
                  </div>
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
