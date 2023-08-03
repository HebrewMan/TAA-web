import { getUserInfo } from "@/api/feature/app";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { setInfoData } from "@/store/slices/appSlice";
import { useRootDispatch, useRootSelector } from "@/store/hooks";
import {
  selectCatSlice,
  setCatInfo,
  setCatStatus,
  setDefaultCat,
} from "@/store/slices/catSlice";
import { getMyCats, getCatInfo, getCatStatus } from "@/api/feature/cat";

export default function UseWeb3Provider({ children }: any) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { defaultCat } = useRootSelector(selectCatSlice);
  const dispatch = useRootDispatch();
  let flag = false;

  const fetchCatInfo = (tokenid: string) => {
    getCatInfo(tokenid).then((res: any) => {
      dispatch(setCatInfo(res));
    });
    getCatStatus(tokenid).then((res: any) => {
      dispatch(setCatStatus(res));
    });
  };

  useEffect(() => {
    if (!address || flag) {
      return;
    }
    flag = true;
    getUserInfo(address as string).then((res) => {
      dispatch(setInfoData({ address: address as string, name: res?.name }));
    });
    if (!defaultCat) {
      getMyCats(address as string).then((res: any) => {
        console.log(res);
        dispatch(setDefaultCat(res[0].token_id));
        fetchCatInfo(res[0].token_id);
      });
    } else {
      fetchCatInfo(defaultCat);
    }
  }, [address]);

  return <>{children}</>;
}
