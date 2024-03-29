import { useRootSelector } from "@/store/hooks";
import { selectAppSlice } from "@/store/slices/appSlice";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./index.scss";
import { useAccount } from "wagmi";
import { selectCatSlice } from "@/store/slices/catSlice";
import { useEffect, useState } from "react";
export default function index(props: { setPopup: any }) {
  const setPopup = props.setPopup;
  const { name } = useRootSelector(selectAppSlice);
  const { catInfo } = useRootSelector(selectCatSlice);
  const { address } = useAccount();
  const addressHandle = (address: string) => {
    return address.slice(0, 4) + "...." + address.slice(-4);
  };
  const [experience, serExperience] = useState("0%");

  useEffect(() => {
    if (Object.keys(catInfo).length > 0) {
      serExperience(`${(catInfo.exp / catInfo.max_exp) * 100}%`);
    }
  }, [catInfo]);
  return (
    <>
      <div className="avatar relative z-2">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");
            return (
              <div
                className="h-full"
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="custom-btn flex items-center"
                      >
                        Login
                      </button>
                    );
                  }
                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        type="button"
                        className="custom-btn"
                      >
                        Wrong network
                      </button>
                    );
                  }
                  return (
                    <>
                      <div
                        className="flex flex-col h-full justify-center"
                        onClick={() => setPopup("cat")}
                      >
                        <p className="font-shadow-black text-12px">{name}</p>
                        <p className="text-#402209 text-8px ">
                          {addressHandle(address as string)}
                        </p>
                      </div>
                      <div className="experience">
                        <div className="experience-text text-8px">
                          {catInfo.level}
                        </div>
                        <div className="experience-box">
                          <div
                            className="experience-line"
                            style={{ width: experience }}
                          ></div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </>
  );
}
