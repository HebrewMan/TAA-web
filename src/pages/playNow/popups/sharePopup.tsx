import React from "react";
import closeSvg from "@/assets/icon/close.svg";

import twitterSvg from "@/assets/icon/twitter.svg";
import facebook from "@/assets/icon/facebook.svg";
import link from "@/assets/icon/link.svg";
import BtnWithShadow from "@/components/btnWithShadow";
const SharePopup = (props: any) => {
  const btns = [
    {
      logo: "",
      text: "Share",
      font: "16px",
      outerColor: "#AC4111",
      shadowColor: "#C6601D",
      height: 52,
      width: 186,
      url: "",
      copy: false,
    },
    {
      logo: twitterSvg,
      text: "Twitter",
      font: "16px",
      outerColor: "#3776AA",
      shadowColor: "#4594D5",
      height: 52,
      width: 199,
      url: "https://twitter.com/TheAnimalAge",
      copy: false,
    },
    {
      logo: facebook,
      text: "Facebook",
      font: "16px",
      outerColor: "#364776",
      shadowColor: "#435994",
      height: 52,
      width: 199,
      url: "https://www.facebook.com/groups/Crazymomi/",
      copy: false,
    },
    {
      logo: link,
      text: "Copy Link",
      font: "16px",
      outerColor: "#889B0E",
      shadowColor: "#AAC211",
      height: 52,
      width: 199,
      url: "https://www.theanimalage.com/",
      copy: true,
    },
  ];

  const shareClick = (item: any) => {
    console.log(item);

    if (item.url) {
      if (item.copy) {
        navigator.clipboard.writeText(item.url);
        props.onClose();
      } else {
        window.open(item.url);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="share-popup">
        <BtnWithShadow item={btns[0]} />
        <img
          className="close cursor-pointer"
          src={closeSvg}
          width={46}
          alt=""
          onClick={props.onClose}
        />

        <div className="share-btns">
          {btns.map(
            (item) =>
              item.logo && (
                <BtnWithShadow
                  key={item.text}
                  item={item}
                  onClick={() => shareClick(item)}
                />
              )
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SharePopup;
