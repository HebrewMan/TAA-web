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
          <span className="font-shadow-black">Introduce</span>
          <img
            className="close"
            src={closeSvg}
            width={46}
            alt=""
            onClick={popupHandle}
          />
          <div className="main">
            Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce
            dignissim luctus sem eu dapibus. Pellentesque vulputate quam a quam
            volutpat, sed ullamcorper erat commodo. Vestibulum sit amet ipsum
            vitae mauris mattis vulputate lacinia nec neque. Aenean quis
            consectetur nisi, ac interdum elit. Aliquam sit amet luctus elit, id
            tempus purus. Donec sed erat ut magna suscipit mattis. Aliquam erat
            volutpat. Morbi in orci risus. Donec pretium fringilla blandit.
            Etiam ut accumsan leo. Aliquam id mi quam. Vivamus dictum ut erat
            nec congue. Etiam facilisis lacus ut arcu vulputate, non
            pellentesque sem convallis. Proin tempus sapien nisl, nec varius
            risus tristique a. Etiam ligula lacus, ultricies at cursus id,
            fringilla nec nulla. Fusce pretium laoreet diam a mollis. In finibus
            purus sed tortor fringilla, eu luctus lorem sodales.Ut dignissim
            ante ac augue vulputate tristique. Mauris venenatis tincidunt nibh,
            sit amet fringilla augue malesuada a. Mauris a nunc congue, viverra
            lectus sed, imperdiet quam. Aenean tempor sem sed lorem ultricies
            lacinia. Sed sit amet tortor nibh. Donec
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default Introduce;
