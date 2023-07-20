import { getUserInfo } from "@/api/feature/app";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { store } from "@/store";
import { setInfoData } from "@/store/slices/appSlice";
export default function UseWeb3Provider({ children }: any) {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log(address);
  useEffect(() => {
    if (!address) {
      return;
    }
    getUserInfo(address as string).then((res) => {
      store.dispatch(
        setInfoData({ address: address as string, name: res?.name })
      );
    });
  }, [address]);

  return <>{children}</>;
}
