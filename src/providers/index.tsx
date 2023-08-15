import { getUserInfo } from "@/api/feature/app";
import { useCallback, useEffect } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";
import { setInfoData, setIsLogin } from "@/store/slices/appSlice";
import { useRootDispatch, useRootSelector } from "@/store/hooks";
import {
  selectCatSlice,
  setCatInfo,
  setCatList,
  setCatStatus,
  setDefaultCat,
} from "@/store/slices/catSlice";
import { getMyCats, getCatInfo, getCatStatus } from "@/api/feature/cat";
import { taaTestChain } from "@/config/constants";
let flag = false;
let getCatStatusTimer: any = null;
export default function UseWeb3Provider({ children }: any) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { defaultCat } = useRootSelector(selectCatSlice);
  const { chain } = useNetwork();
  const dispatch = useRootDispatch();
  const { switchNetwork } = useSwitchNetwork({
    chainId: taaTestChain.id,
  });

  // 切换网络
  useEffect(() => {
    if (chain?.id != taaTestChain.id && switchNetwork) {
      switchNetwork();
    }
  }, [chain, switchNetwork]);

  const fetchCatInfo = useCallback((tokenid: any) => {
    getCatInfo(tokenid).then((res: any) => {
      dispatch(setCatInfo(res));
    });
  }, []);
  const fetchCatStatus = useCallback((defaultCat: any) => {
    getCatStatus(defaultCat).then((res: any) => {
      dispatch(setCatStatus(res));
    });
  }, []);

  useEffect(() => {
    if (defaultCat) {
      fetchCatInfo(defaultCat);
      fetchCatStatus(defaultCat);
      clearInterval(getCatStatusTimer);
      getCatStatusTimer = setInterval(() => {
        fetchCatStatus(defaultCat);
      }, 1000 * 60);
    }
  }, [defaultCat]);

  useEffect(() => {
    if (!address) {
      dispatch(setIsLogin(false));
    }
    if (flag) {
      return;
    }

    flag = true;
    dispatch(setIsLogin(true));
    getUserInfo(address as string).then((res) => {
      dispatch(setInfoData({ address: address as string, name: res?.name }));
    });
    getMyCats(address as string).then((res: any) => {
      dispatch(setCatList(res));
      res.forEach((item: any) => {
        if (item.selected) {
          dispatch(setDefaultCat(item.token_id));
        }
      });
    });
  }, [address]);

  return <>{children}</>;
}
