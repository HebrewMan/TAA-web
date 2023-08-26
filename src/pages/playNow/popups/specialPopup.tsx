import React from "react";
import closeSvg from "@/assets/icon/close.svg";

import Market from "@/pages/market";
import MyNft from "@/pages/myNft";
import Tasks from "@/pages/tasks";
import Knapsack from "@/pages/knapsack";
import SalaryPopup from "./salaryPopup";
const SpecialPopup = (props: any) => {
  const { popupStatus } = props;
  let content;

  switch (popupStatus) {
    case "Market":
      content = <Market />;
      break;
    case "MyNFT":
      content = <MyNft />;
      break;
    case "tasks":
      content = <Tasks />;
      break;
    case "knapsack":
      content = <Knapsack />;
      break;
    case "salary":
      content = <SalaryPopup />;
      break;
    default:
      content = <Market />;
      break;
  }

  return (
    <React.Fragment>
      <div className="special-popup">
        <img
          className="close-special-popup"
          src={closeSvg}
          width={46}
          alt=""
          onClick={props.onClose}
        />
        <div className="contant">{content}</div>
      </div>
    </React.Fragment>
  );
};

export default SpecialPopup;
