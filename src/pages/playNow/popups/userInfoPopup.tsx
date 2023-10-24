import React, { useEffect } from "react";
import closeSvg from "@/assets/icon/close.svg";
import avaterSvg from "@/assets/icon/avater.svg";
import penSvg from "@/assets/icon/pen.svg";
import { useAccount } from "wagmi";
import { getUserInfo, setUserName } from "@/api/feature/app";
import { useRootDispatch, useRootSelector } from "@/store/hooks";
import { selectAppSlice, setInfoData } from "@/store/slices/appSlice";
import titleLineImg from "@/assets/bakeground/user-title.svg";
import titleBgImg from "@/assets/bakeground/title-bg.png";
import { Image, Toast } from "react-vant";
import { Success } from "@react-vant/icons";
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
      if (username.length > 7) {
        Toast.info("name is too long");
        return;
      }
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

  useEffect(() => {
    setIsSetUsername(false);
  }, [props.visible]);

  return (
    <React.Fragment>
      <div className="user-info-popup">
        <Image
          className="title-line"
          width="155"
          height="253"
          src={titleLineImg}
        />
        <Image
          className="title-bg"
          width="186"
          height={"auto"}
          src={titleBgImg}
        />
        <img
          className="close z-2"
          src={closeSvg}
          width={46}
          alt=""
          onClick={props.onClose}
        />
        <div className="user-info-wrap">
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
                  {isSetUsername ? (
                    <Success
                      color="#402209"
                      fontSize="20px"
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
                <p className="text-#402209 text-12px">
                  {addressHandle(address as string)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserInfoPopup;
