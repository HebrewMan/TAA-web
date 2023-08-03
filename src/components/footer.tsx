import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import playnowImg from "@/assets/icon/playnow.png";
import marketImg from "@/assets/icon/market.png";
import mynftImg from "@/assets/icon/mynft.png";
import introduceImg from "@/assets/icon/introduce.png";

import baseCurImg from "@/assets/icon/base-cur.png";

import "./style/footer.scss";
import { useRootDispatch } from "@/store/hooks";
import { setPopusStatus } from "@/store/slices/appSlice";
const Footer = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useRootDispatch();
  let path = pathname.replace("/", "");
  const [nav, setNav] = useState(path);

  const routerHandle = (path: string) => {
    if (window.screen.availWidth <= 1000) {
      setNav(path);
      navigate(`/${path.toLowerCase()}`);
      return;
    }
    dispatch(setPopusStatus(path));
  };

  const navBar = [
    { baseImage: playnowImg, baseCurImage: baseCurImg, path: "PlayNow" },
    { baseImage: marketImg, baseCurImage: baseCurImg, path: "Market" },
    { baseImage: mynftImg, baseCurImage: baseCurImg, path: "MyNFT" },
    { baseImage: introduceImg, baseCurImage: baseCurImg, path: "Introduce" },
  ];

  navBar.forEach;

  return (
    <React.Fragment>
      <div className="footer ">
        <span className="welcome">WELCOME!</span>
        <ul>
          {navBar.map((item) => (
            <li
              className={
                item.path.toLocaleLowerCase() == nav.toLocaleLowerCase()
                  ? "li-cur"
                  : ""
              }
              onClick={() => routerHandle(item.path)}
              key={item.path}
            >
              <img src={item.baseImage} alt="" />
              <img
                src={item.baseCurImage}
                alt=""
                width={70}
                className="base-cur"
              />
              <span className="font-shadow-black">{item.path}</span>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Footer;
