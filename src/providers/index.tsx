import { getMyCats, getUserInfo } from "@/api/feature/app";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { store } from "@/store";
import { setInfoData } from "@/store/slices/appSlice";
export default function UseWeb3Provider({ children }: any) {
  const { address, isConnecting, isDisconnected } = useAccount();
  let flag = false;
  useEffect(() => {
    if (!address || flag) {
      return;
    }
    flag = true;
    console.log(address);
    getUserInfo(address as string).then((res) => {
      store.dispatch(
        setInfoData({ address: address as string, name: res?.name })
      );
    });
    getMyCats(address as string).then((res) => {
      console.log(res);
    });
  }, [address]);

  return <>{children}</>;
}
