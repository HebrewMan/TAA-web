import { getUserInfo, login } from "@/api/feature/app";
import { useCallback, useEffect } from "react";
import {
  useAccount,
  useNetwork,
  useSignMessage,
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
import { getLocal, setLocal } from "@/utils";
let flag = false;
let getCatStatusTimer: any = null;
let time = (new Date().getTime() / 1000).toFixed(0);
export default function UseWeb3Provider({ children }: any) {
  const { address } = useAccount();
  const { defaultCat } = useRootSelector(selectCatSlice);
  const { chain } = useNetwork();
  const dispatch = useRootDispatch();
  const { switchNetwork } = useSwitchNetwork({
    chainId: import.meta.env.VITE_CHAINID,
  });
  const { data: signData, signMessage } = useSignMessage({
    message: `${address}${time}`,
  });
  const token = getLocal("token");

  useEffect(() => {
    if (!signData) {
      return;
    }

    login({
      address,
      signature: signData,
      timestamp: time,
    }).then((res: any) => {
      if (res.token) {
        dispatch(setIsLogin(true));
        setLocal("token", res.token);
      }
    });
  }, [signData]);

  useEffect(() => {
    if (!token) {
      signMessage();
    }
  }, [token, signMessage]);

  // 切换网络
  useEffect(() => {
    if (chain?.id != import.meta.env.VITE_CHAINID && switchNetwork) {
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
    if (defaultCat && address) {
      fetchCatInfo(defaultCat);
      fetchCatStatus(defaultCat);
      clearInterval(getCatStatusTimer);
      getCatStatusTimer = setInterval(() => {
        fetchCatStatus(defaultCat);
      }, 1000 * 60);
    }
  }, [defaultCat, address]);

  useEffect(() => {
    if (!address) {
      dispatch(setIsLogin(false));
      return;
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
