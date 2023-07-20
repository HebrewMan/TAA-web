import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./index.scss";
import { useBalance, useAccount, useContractRead } from "wagmi";
import usdtabi from "@/abi/USDT.json";
export default function index() {
  // const { address, isConnecting, isDisconnected } = useAccount();
  // const { data, isError, isLoading } = useBalance({
  //   address: "0xbe66925FBA478e5AdEc50FDaED7a79E32F0B498a",
  //   chainId: 280,
  // });
  // const { data, isError, isLoading } = useContractRead({
  //   address: "0x2c0fa58088c917a345EE3d61093cC33e13741aa6",
  //   abi: usdtabi.abi,
  //   functionName: "balanceOf",
  //   args: ["0xbe66925FBA478e5AdEc50FDaED7a79E32F0B498a"],
  // });
  // console.log(data);

  return (
    <div className="">
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
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");
          return (
            <div
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
                      className="custom-btn"
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
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="custom-btn text-12px important-px-8px"
                    >
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
