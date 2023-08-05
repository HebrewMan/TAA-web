import React from "react";
import "./style/attribute.scss";
import device from "current-device";
const Attibute = (props: any) => {
  const width = (props.value / 100) * props.logoWidth * 2;
  const isMobile = device.mobile();
  return (
    <>
      <div className="attibute small relative mb-8px" style={{ width: "64px" }}>
        <img
          className="z-200"
          src={props.typeImg}
          width={props.logoWidth}
          alt=""
        />
        <div
          className={`absolute z-100 left-10px  attibute-status `}
          style={{
            width: `${props.logoWidth * 2}px`,
            height: `${props.height}px`,
          }}
        >
          <div
            style={{
              background: props.gradientBk,
              width: `${width}px`,
            }}
            className={`absolute h-24px`}
          ></div>
          <span
            className={
              isMobile
                ? "font-shadow-black text-10px text-center z-500 absolute left-32%"
                : "font-shadow-black text-10px text-center z-500 absolute left-40%"
            }
            style={{ lineHeight: `${props.height}px` }}
          >
            {props.value}
          </span>
        </div>
      </div>
    </>
  );
};

export default Attibute;
