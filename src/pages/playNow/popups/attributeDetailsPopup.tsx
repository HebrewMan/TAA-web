import React, { useEffect, useState } from "react";
import "../index.scss";
import staminaSvg from "@/assets/icon/staminaLogo.svg";
import charismaSvg from "@/assets/icon/charismaLogo.svg";
import cleanSvg from "@/assets/icon/cleanLogo.svg";
import iqSvg from "@/assets/icon/iqLogo.svg";
import penSvg from "@/assets/icon/pen.svg";
import closeSvg from "@/assets/icon/close.svg";
import AttibuteSmall from "@/components/attributeSmall";
import { useRootDispatch, useRootSelector } from "@/store/hooks";
import { selectCatSlice, setCatInfo } from "@/store/slices/catSlice";
import { getCatInfo, setCatName } from "@/api/feature/cat";
import { useAccount } from "wagmi";
import { Image, Toast } from "react-vant";
import taaImg from "@/assets/bakeground/taa.png";
import { Success } from "@react-vant/icons";
const AttibuteDetails = (props: any) => {
  const { address } = useAccount();
  const { catInfo, catStatus } = useRootSelector(selectCatSlice);
  const [isSetUsername, setIsSetUsername] = React.useState(false);
  const [username, setUsername] = React.useState(catInfo.name);
  const dispatch = useRootDispatch();
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

  // 猫咪属性
  useEffect(() => {
    attibute_list[3].value = catStatus.comfort || 0;
    attibute_list[2].value = catStatus.stamina || 0;
    attibute_list[0].value = catStatus.health || 0;
    attibute_list[1].value = catStatus.happiness || 0;
    setAttibute_list([...attibute_list]);
  }, [catStatus]);

  const changeHandle = (e: any) => {
    setUsername(e.target.value);
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  const setUserNameHandle = (e: any) => {
    if (isSetUsername) {
      if (username.length > 7) {
        Toast.info("name is too long");
        return;
      }
      setCatName({
        address,
        name: username,
        tokenid: catInfo.token_id,
      }).then((res) => {
        if (res) {
          setIsSetUsername(false);
          getCatInfo(`${catInfo.token_id}`).then((res: any) => {
            dispatch(setCatInfo(res));
          });
        }
      });
    } else {
      setIsSetUsername(true);
    }
  };

  useEffect(() => {
    setIsSetUsername(false);
  }, [props.visible]);

  return (
    <React.Fragment>
      <div className="attibute-details-popup">
        <div className="main">
          <img
            className="close absolute right--16px top-16% z-2 cursor-pointer"
            src={closeSvg}
            width={46}
            alt=""
            onClick={props.onClose}
          />
          <div className="title font-shadow-black">Cat Detail</div>
          <img className="cat" src={catInfo.image} alt="" />
          <p className="name" onClick={stopPropagation}>
            {!isSetUsername ? (
              catInfo.name
            ) : (
              <input
                type="text"
                className="bg-transparent border-0 border-b w-250px h-26px text-28px color-#213547"
                value={username}
                onChange={(e) => changeHandle(e)}
              />
            )}
            {isSetUsername ? (
              <Success
                color="#402209"
                fontSize="26px"
                onClick={setUserNameHandle}
              />
            ) : (
              <img
                src={penSvg}
                width={16}
                alt=""
                onClick={setUserNameHandle}
                className="ml-7px"
              />
            )}
          </p>
          <div className="attibute_list">
            {attibute_list.map((item) => (
              <AttibuteSmall
                logoWidth={27}
                height={20}
                typeImg={item.typeImg}
                gradientBk={item.gradientBk}
                value={item.value}
                key={item.typeImg}
              />
            ))}
          </div>
        </div>
        <div className="attibutes">
          <div className="btn" style={{ boxShadow: "0px 5px 0px 0px #E2AA73" }}>
            <div className="wrap-sign">
              <div className="h-45px relative flex items-center">
                <Image
                  className="important-absolute left--20px top-0"
                  width="48"
                  height="45"
                  src={taaImg}
                />
                <div className="sign-box">{catInfo.taa}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AttibuteDetails;
