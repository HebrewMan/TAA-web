import React from "react";
import closeSvg from "@/assets/icon/close.svg";
import avaterSvg from "@/assets/icon/avater.svg";
import penSvg from "@/assets/icon/pen.svg";
import starBk from "@/assets/bakeground/star_bk.png";
import feetBk from "@/assets/bakeground/feet_bk.png";
import { useAccount } from "wagmi";
import { getUserInfo, setUserName } from "@/api/feature/app";
import { useRootDispatch, useRootSelector } from "@/store/hooks";
import { selectAppSlice, setInfoData } from "@/store/slices/appSlice";
import taaImg from "@/assets/bakeground/taa.png";
import ethImg from "@/assets/bakeground/eth.png";
import { Image } from "react-vant";

const UserInfoPopup = (props: any) => {
  const { address } = useAccount();
  const { name } = useRootSelector(selectAppSlice);
  const [username, setUsername] = React.useState(name);
  const [isSetUsername, setIsSetUsername] = React.useState(false);
  const dispatch = useRootDispatch();

  const addressHandle = (address: string) => {
    return address.slice(0, 4) + "...." + address.slice(-4);
  };

  const changeHandle = (e: any) => {
    setUsername(e.target.value);
  };

  const setUserNameHandle = (e: any) => {
    if (isSetUsername) {
      setUserName({
        address,
        name: username,
      }).then((res) => {
        if (res) {
          setIsSetUsername(false);
          getUserInfo(address as string).then((res) => {
            dispatch(
              setInfoData({ address: address as string, name: res?.name })
            );
          });
        }
      });
    } else {
      setIsSetUsername(true);
    }
  };

  return (
    <React.Fragment>
      <div className="user-info-popup">
        <span className="font-shadow-black">Title</span>
        <img
          className="close"
          src={closeSvg}
          width={46}
          alt=""
          onClick={props.onClose}
        />
        <div className="user-info">
          <div
            className="shadow-cur"
            style={{ boxShadow: "0px 6px 0px 0px #E2AA73" }}
          >
            <img className="avater" src={avaterSvg} width={40} alt="" />
            <div className="info">
              <p className="font-shadow-black text-16px">
                {!isSetUsername ? (
                  name
                ) : (
                  <input
                    type="text"
                    className="bg-transparent border-0 border-b font-shadow-black w-110px"
                    value={username}
                    onChange={(e) => changeHandle(e)}
                  />
                )}
                <img
                  src={penSvg}
                  width={16}
                  alt=""
                  onClick={setUserNameHandle}
                  className="ml-7px"
                />
              </p>
              <p className="text-#402209 text-12px">
                {addressHandle(address as string)}
              </p>
            </div>
          </div>
        </div>
        <div className="wrap-sign">
          <div className="relative">
            <Image
              className="absolute left--20px top--7px"
              width="48"
              height="45"
              src={taaImg}
            />
            <div className="sign-box">10</div>
          </div>
          {/* <div className="relative mt-30px">
            <Image
              className="absolute left--20px top--7px"
              width="48"
              height="45"
              src={ethImg}
            />
            <div className="sign-box days-one">10</div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserInfoPopup;
