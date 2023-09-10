import React, { useState } from "react";
import closeSvg from "@/assets/icon/close.svg";
import { useNavigate } from "react-router-dom";

import { Popup } from "react-vant";

import { useRootDispatch } from "@/store/hooks";
import { setPopusStatus } from "@/store/slices/appSlice";

const Introduce = () => {
  const [popup, setPopup] = useState(true);
  const nav = useNavigate();

  const dispatch = useRootDispatch();

  const popupHandle = () => {
    if (window.screen.availWidth <= 1000) {
      setPopup(false);
      setTimeout(() => nav(-1), 500);
      return;
    }
    dispatch(setPopusStatus(""));
  };

  return (
    <React.Fragment>
      <Popup
        visible={popup}
        style={{ background: "none", height: "100%" }}
        position="top"
      >
        <div className="introduce-popup">
          <span className="font-shadow-black">Introduction</span>
          <img
            className="close"
            src={closeSvg}
            width={46}
            alt=""
            onClick={popupHandle}
          />
          <div className="main">
            The Animal Age is an animal-themed metaverse, starting with our
            million-cat community, creating an animal-themed metaverse and
            providing more NFTs. Our animal NFTs will cooperate with many IPs,
            brands, and animal organizations. Users can raise adopted animals by
            consuming items obtained from daily goals and milestones. By
            interacting with animals, participating in competitions, and
            exploring the world, users can earn TAA coins as rewards. TAA coins
            can be used to buy more items to raise animals or sell on the
            market.
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default Introduce;
