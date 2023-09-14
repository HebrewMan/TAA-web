import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import Attibute from "@/components/attribute";
import AttibuteDetailsPopup from "./popups/attributeDetailsPopup";
import UserInfoPopup from "./popups/userInfoPopup";
import SharePopup from "./popups/sharePopup";
import LoginPopup from "./popups/loginPopup";
import SetPopup from "./popups/setPopup";
import SpecialPopup from "./popups/specialPopup";
import SalaryPopup from "./popups/salaryPopup";
import Introduce from "@/pages/introduce";
import { Popup, Toast, Image } from "react-vant";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import shareSvg from "@/assets/icon/share.svg";
import setSvg from "@/assets/icon/set.svg";
import groupSvg from "@/assets/icon/group.svg";
import knapsackImg from "@/assets/icon/knapsack.png";
import friendsImg from "@/assets/icon/friends.png";
import tasksImg from "@/assets/icon/tasks.png";
import mallsImg from "@/assets/icon/malls.png";
import { useRootDispatch, useRootSelector } from "@/store/hooks";
import { selectAppSlice, setPopusStatus } from "@/store/slices/appSlice";
import LoginBtn from "./loginBtn";
import Notice from "./notice";
import {
  selectCatSlice,
  setCatInfo,
  setCatStatus,
  setDefaultCat,
} from "@/store/slices/catSlice";
import catChangeImg from "@/assets/icon/cat_change.svg";
import { getCatInfo, getCatStatus, selectCat } from "@/api/feature/cat";
import { useAccount } from "wagmi";
import { useActivate, useUnactivate } from "react-activation";
import device from "current-device";

let catTimer: any = null;
let noticeTimer: any = null;
const PlayNow = () => {
  const isMobile = device.mobile();
  const { address } = useAccount();
  const { status, isLogin } = useRootSelector(selectAppSlice);
  const { catInfo, catStatus, catList, defaultCat } =
    useRootSelector(selectCatSlice);
  const nav = useNavigate();
  const menu = [
    { title: "my bag", img: knapsackImg },
    { title: "friends", img: friendsImg },
    { title: "tasks", img: tasksImg },
    { title: "salary", img: mallsImg },
  ];

  const [popup, setPopup] = useState("");
  const [showNotice, setShowNotice] = useState(false);

  const dispatch = useRootDispatch();
  const onClose = () => {
    dispatch(setPopusStatus(""));
    setPopup("");
  };

  //渲染pc版弹窗
  useEffect(() => {
    setPopup(status);
  }, [status]);

  const [attibute_list, setAttibute_list] = useState([
    {
      typeImg: staminaSvg,
      gradientBk: "linear-gradient(180deg, #FF8D8D 0%, #C93413 117.9%)",
      value: 0,
      name: "health",
    },
    {
      typeImg: charismaSvg,
      gradientBk: "linear-gradient(180deg, #DB8EFF 0%, #6C1794 118.75%)",
      value: 0,
      name: "happiness",
    },
    {
      typeImg: cleanSvg,
      gradientBk: "linear-gradient(180deg, #98CEFF 0%, #0A569D 118.75%)",
      value: 0,
      name: "stamina",
    },
    {
      typeImg: iqSvg,
      gradientBk: "linear-gradient(180deg, #C9F7C2 0%, #3B8734 130%)",
      value: 0,
      name: "comfort",
    },
  ]);

  // 猫咪属性
  useEffect(() => {
    attibute_list[3].value = catStatus.comfort || 0;
    attibute_list[2].value = catStatus.stamina || 0;
    attibute_list[0].value = catStatus.health || 0;
    attibute_list[1].value = catStatus.happiness || 0;
    setAttibute_list([...attibute_list]);
  }, [catStatus]);

  const fetchCatInfo = useCallback((tokenid: any) => {
    getCatInfo(tokenid).then((res: any) => {
      dispatch(setCatInfo(res));
    });
  }, []);
  const fetchCatStatus = useCallback((defaultCat: any) => {
    getCatStatus(defaultCat).then((res: any) => {
      dispatch(setCatStatus(res));
    });
  }, []);

  const timeCatInfo = () => {
    clearInterval(catTimer);
    if (defaultCat) {
      fetchCatInfo(defaultCat);
      fetchCatStatus(defaultCat);
    }
    catTimer = setInterval(() => {
      timeCatInfo();
    }, 5000);
  };

  const noticeHandle = () => {
    if (catList.length > 0) {
      setShowNotice(true);
    }
    clearInterval(noticeTimer);
    setTimeout(() => {
      setShowNotice(false);
    }, 10000);
    noticeTimer = setInterval(() => {
      if (!popup && catList.length > 0) {
        setShowNotice(true);
      }
      setTimeout(() => {
        setShowNotice(false);
      }, 10000);
    }, 25000);
  };

  useEffect(() => {
    timeCatInfo();
  }, [defaultCat]);

  useEffect(() => {
    noticeHandle();
  }, [popup]);

  useActivate(() => {
    noticeHandle();
    timeCatInfo();
  });

  useUnactivate(() => {
    clearInterval(catTimer);
    clearInterval(noticeTimer);
  });

  const routerHandle = (path: string) => {
    if (!isLogin || !address) {
      return;
    }

    if (path == "friends") {
      window.open("https://discord.com/invite/CSPaTUXPEu");
      return;
    }

    if (path == "salary" && !defaultCat) {
      return;
    }
    if (path == "salary" && isMobile) {
      setPopup(path);
      return;
    }

    setShowNotice(false);
    if (window.screen.availWidth <= 1000) {
      if (path != "tasks" && path != "my bag") {
        Toast({ message: "Coming Soon" });
        return;
      }
      nav(`/${path}`);
      return;
    }

    dispatch(setPopusStatus(path));
  };

  const selectCathandle = () => {
    let index = 0;
    for (let i = 0; i < catList.length; i++) {
      if (catList[i].token_id == defaultCat) {
        if (i < catList.length - 1) {
          index = i + 1;
        } else {
          index = 0;
        }
      }
    }
    selectCat({ address, tokenid: catList[index].token_id }).then((res) => {
      dispatch(setDefaultCat(catList[index].token_id));
      getCatInfo(catList[index].token_id).then((res: any) => {
        dispatch(setCatInfo(res));
      });
      getCatStatus(catList[index].token_id).then((res: any) => {
        dispatch(setCatStatus(res));
      });
    });
  };

  let isIntroduce;
  if (status === "Introduction") isIntroduce = <Introduce />;

  return (
    <>
      <div className="home">
        <div className="header flex justify-between items-center">
          {/* <div className="avatar pt-8px" onClick={() => setPopup("cat")}>
            <p className="font-shadow-black text-12px">NAME</p>
            <p className="text-#402209 text-8px">{name}</p>
          </div> */}
          <LoginBtn setPopup={setPopup}></LoginBtn>

          <div className="flex">
            <span
              className="share relative cursor-pointer"
              onClick={() => setPopup("share")}
            >
              <img src={shareSvg} width={45} alt="" />
              <i className="text-after text-10px font-shadow-black top-42px">
                Share
              </i>
            </span>

            <span
              className="set relative bottom-1px cursor-pointer"
              onClick={() => setPopup("set")}
            >
              <img src={setSvg} width={45} alt="" />
              <i className="text-after text-10px font-shadow-black top-42px">
                Set
              </i>
            </span>
          </div>
        </div>

        <Popup
          visible={popup == "set"}
          style={{ background: "none", height: "100%" }}
          position="top"
        >
          <SetPopup onClose={onClose} />
        </Popup>

        <Popup
          visible={popup == "login"}
          style={{ background: "none", height: "100%" }}
          position="top"
        >
          <LoginPopup onClose={onClose} />
        </Popup>

        <Popup
          visible={popup == "attibute"}
          style={{ background: "none", height: "82%" }}
          position="top"
          onClose={onClose}
        >
          <AttibuteDetailsPopup
            visible={popup == "attibute"}
            onClose={onClose}
          />
        </Popup>

        <Popup
          visible={popup == "share"}
          style={{ background: "none", height: "100%" }}
          position="top"
        >
          <SharePopup onClose={onClose} />
        </Popup>

        <Popup
          visible={popup == "cat"}
          style={{ background: "none", height: "77%" }}
          position="top"
        >
          <UserInfoPopup visible={popup == "cat"} onClose={onClose} />
        </Popup>

        <Popup
          visible={
            popup == "Market" ||
            popup == "MyNFT" ||
            popup == "my bag" ||
            popup == "tasks" ||
            (popup == "salary" && !isMobile)
          }
          style={{ background: "none", height: "100%" }}
          position="top"
          destroyOnClose={true}
        >
          <SpecialPopup popupStatus={status} onClose={onClose} />
        </Popup>

        <Popup
          visible={popup == "salary" && isMobile}
          style={{ background: "none", height: "100%" }}
          position="top"
        >
          <SalaryPopup onClose={onClose} />
        </Popup>
        {isIntroduce}
        {isLogin && address && (
          <div className="life-attribute">
            <img src={groupSvg} alt="" className="group-left" />
            <img src={groupSvg} alt="" className="group-right" />
            {attibute_list.map((item) => (
              <Attibute
                height={25}
                logoWidth={34}
                typeImg={item.typeImg}
                gradientBk={item.gradientBk}
                value={item.value}
                key={item.typeImg}
                name={item.name}
              />
            ))}
          </div>
        )}
        {isLogin && (
          <div className="cat">
            <Image
              className="absolute top--8px left-0px z-2"
              width="400"
              height="auto"
              src={catInfo.image}
              onClick={() => setPopup("attibute")}
            />
            {catList.length > 1 && (
              <Image
                className="important-absolute top-320px left-275px z-3"
                width="36"
                height="auto"
                src={catChangeImg}
                onClick={selectCathandle}
              />
            )}
            <Notice visible={showNotice} onClose={setShowNotice}></Notice>
          </div>
        )}
        <div className="menu">
          {menu.map((item) => (
            <div
              onClick={() => routerHandle(item.title)}
              className={`menu-item relative ${
                item.title != "my bag" && "mt-8px"
              }`}
              key={item.title}
            >
              <img src={item.img} width={52} alt="" />
              <i className="text-after text-12px font-shadow-black top-50px whitespace-nowrap">
                {item.title}
              </i>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayNow;
