import React, { useState } from "react";

import closeSvg from "@/assets/icon/close.svg";
import musicSvg from "@/assets/icon/music.svg";
import downSvg from "@/assets/icon/down.svg";

import BtnWithShadow from "@/components/btnWithShadow";

const SetPopup = (props: any) => {
  const btn = {
    logo: "",
    text: "Setting",
    font: "16px",
    outerColor: "#A94111",
    shadowColor: "#C6601D",
    height: 46,
    width: 186,
  };
  const langBtn = {
    logo: downSvg,
    text: "English",
    font: "16px",
    outerColor: "#D38F5B",
    shadowColor: "#FFD28E",
    height: 34,
    width: 120,
  };

  const logout = () => {};

  let [musicSwitch, setMusicSwitch] = useState(false);
  const [position, setPosition] = useState(0);
  const [btnColors, setBtnColors] = useState({
    outerColor: "#A02424",
    shadowColor: "linear-gradient(0deg, #D64F4F, #D64F4F), #BAD60F",
  });

  const setMusicSwitchHandle = () => {
    setMusicSwitch((musicSwitch = !musicSwitch));
    setPosition(musicSwitch ? 90 : 0);
    setBtnColors(
      musicSwitch
        ? { outerColor: "#C9955C", shadowColor: "#FFD28E" }
        : {
            outerColor: "#A02424",
            shadowColor: "linear-gradient(0deg, #D64F4F, #D64F4F), #BAD60F",
          }
    );
  };

  return (
    <React.Fragment>
      <div className="share-popup set-popup" style={{ height: "260px" }}>
        <BtnWithShadow item={btn} />
        <img
          className="close"
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

        <div className="switch" style={{ marginTop: "25px" }}>
          <span>Language</span>

          <div className="lang-btn" onClick={setMusicSwitchHandle}>
            <div className="lang-shadow">
              <span>{langBtn.text}</span>
              <img src={langBtn.logo} width={12} height={12} alt="" />
            </div>
          </div>
        </div>

        <div className="btn">
          <div className="text font-shadow-block" onClick={logout}>
            Log out
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SetPopup;
