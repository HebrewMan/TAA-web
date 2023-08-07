import { useState, useEffect } from "react";
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
import { Popup, Toast } from "react-vant";
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
import { selectCatSlice } from "@/store/slices/catSlice";

const PlayNow = () => {
  const { status, isLogin } = useRootSelector(selectAppSlice);
  const { catInfo, catStatus } = useRootSelector(selectCatSlice);
  const nav = useNavigate();
  const menu = [
    { title: "knapsack", img: knapsackImg },
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

  // 猫咪属性
  useEffect(() => {
    attibute_list[3].value = catStatus.intellect;
    attibute_list[2].value = catStatus.stamina;
    attibute_list[0].value = catStatus.comfort;
    attibute_list[1].value = catStatus.charm;
    setAttibute_list([...attibute_list]);
  }, [catStatus]);

  const routerHandle = (path: string) => {
    if (!isLogin) {
      return;
    }
    if (path == "salary") {
      setPopup(path);
      return;
    }
    if (window.screen.availWidth <= 1000) {
      if (path != "tasks" && path != "knapsack") {
        Toast({ message: "Coming Soon" });
        return;
      }
      nav(`/${path}`);
      return;
    }
    dispatch(setPopusStatus(path));
  };

  let isIntroduce;
  if (status === "Introduce") isIntroduce = <Introduce />;

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
              className="set relative cursor-pointer"
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
          <AttibuteDetailsPopup onClose={onClose} />
        </Popup>

        <Popup
          visible={popup == "share"}
          style={{ background: "none", height: "100%" }}
        >
          <SharePopup onClose={onClose} />
        </Popup>

        <Popup
          visible={popup == "cat"}
          style={{ background: "none", height: "77%" }}
          position="top"
        >
          <UserInfoPopup onClose={onClose} />
        </Popup>

        <Popup
          visible={
            popup == "Market" ||
            popup == "MyNFT" ||
            popup == "knapsack" ||
            popup == "tasks"
          }
          style={{ background: "none", height: "100%" }}
          position="top"
        >
          <SpecialPopup popupStatus={status} onClose={onClose} />
        </Popup>

        <Popup
          visible={popup == "salary"}
          style={{ background: "none", height: "100%" }}
          position="top"
        >
          <SalaryPopup onClose={onClose} />
        </Popup>

        {/* <Popup visible={ popup == 'Introduce'} style={{background:'none', height: '100%'}}  position='top'> */}
        {isIntroduce}
        {isLogin && (
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
              />
            ))}
          </div>
        )}
        {isLogin && (
          <div className="cat" onClick={() => setPopup("attibute")}>
            <img src={catInfo.image} alt="" width={184} />
          </div>
        )}

        <Notice visible={showNotice} onClose={setShowNotice}></Notice>
        <div className="menu">
          {menu.map((item) => (
            <div
              onClick={() => routerHandle(item.title)}
              className={`menu-item relative ${
                item.title != "knapsack" && "mt-8px"
              }`}
              key={item.title}
            >
              <img src={item.img} width={52} alt="" />
              <i className="text-after text-12px font-shadow-black top-50px">
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
