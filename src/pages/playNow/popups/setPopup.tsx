import React, { useState } from "react";

import closeSvg from "@/assets/icon/close.svg";
import musicSvg from "@/assets/icon/music.svg";
import downSvg from "@/assets/icon/down.svg";

import BtnWithShadow from "@/components/btnWithShadow";
import { useRootSelector } from "@/store/hooks";
import { selectAppSlice } from "@/store/slices/appSlice";
import { videoStart, videoStop } from "@/utils";

const SetPopup = (props: any) => {
  const { isLogin } = useRootSelector(selectAppSlice);

  const logout = () => {
    localStorage.clear();
    props.onClose();
    location.reload();
  };

  let [musicSwitch, setMusicSwitch] = useState(
    localStorage.taaVideo && localStorage.taaVideo == 1
  );

  const [position, setPosition] = useState(
    localStorage.taaVideo && localStorage.taaVideo == 1 ? 90 : 0
  );
  const [btnColors, setBtnColors] = useState(
    musicSwitch
      ? {
          outerColor: "#A02424",
          shadowColor: "linear-gradient(0deg, #D64F4F, #D64F4F), #BAD60F",
        }
      : { outerColor: "#C9955C", shadowColor: "#FFD28E" }
  );

  const btn = {
    logo: "",
    text: "Setting",
    font: "16px",
    outerColor: "#A94111",
    shadowColor: "#C6601D",
    height: 46,
    width: 186,
  };

  const setMusicSwitchHandle = () => {
    setMusicSwitch((musicSwitch = !musicSwitch));
    setPosition(musicSwitch ? 90 : 0);
    if (musicSwitch) {
      videoStart();
      localStorage.taaVideo = 1;
    } else {
      videoStop();
      localStorage.taaVideo = 0;
    }

    setBtnColors(
      musicSwitch
        ? {
            outerColor: "#A02424",
            shadowColor: "linear-gradient(0deg, #D64F4F, #D64F4F), #BAD60F",
          }
        : { outerColor: "#C9955C", shadowColor: "#FFD28E" }
    );
  };

  return (
    <>
      <div className="share-popup set-popup" style={{ height: "200px" }}>
        <BtnWithShadow item={btn} />
        <img
          className="close cursor-pointer"
          src={closeSvg}
          width={46}
          alt=""
          onClick={props.onClose}
        />

        <div className="switch" style={{ marginTop: "32px" }}>
          <span>Music Title</span>
          <div
            className="switch-btn"
            style={{ background: btnColors.outerColor }}
            onClick={setMusicSwitchHandle}
          >
            <div
              className="shadow"
              style={{ background: btnColors.shadowColor }}
            ></div>
          </div>
          <img
            src={musicSvg}
            className="music-logo"
            width={38}
            height={38}
            alt=""
            style={{ transform: `translateX(${position}px)` }}
            onClick={setMusicSwitchHandle}
          />
        </div>

        {/* <div className="switch" style={{ marginTop: "25px" }}>
          <span>Language</span>

          <div className="lang-btn" onClick={setMusicSwitchHandle}>
            <div className="lang-shadow">
              <span>{langBtn.text}</span>
              <img src={langBtn.logo} width={12} height={12} alt="" />
            </div>
          </div>
        </div> */}

        {isLogin && (
          <div className="btn">
            <div className="text font-shadow-block" onClick={logout}>
              Log out
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SetPopup;
