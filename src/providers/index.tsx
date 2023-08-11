import { getUserInfo } from "@/api/feature/app";
import { useCallback, useEffect } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { setInfoData, setIsLogin } from "@/store/slices/appSlice";
import { useRootDispatch, useRootSelector } from "@/store/hooks";
import {
  selectCatSlice,
  setCatInfo,
  setCatStatus,
  setDefaultCat,
} from "@/store/slices/catSlice";
import { getMyCats, getCatInfo, getCatStatus } from "@/api/feature/cat";
import taakAbi from "@/abi/taak.json";
let flag = false;
let getCatStatusTimer = null;
export default function UseWeb3Provider({ children }: any) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { defaultCat } = useRootSelector(selectCatSlice);

  const dispatch = useRootDispatch();
  const fetchCatInfo = useCallback((tokenid) => {
    getCatInfo(tokenid).then((res: any) => {
      dispatch(setCatInfo(res));
    });
  }, []);
  const fetchCatStatus = useCallback((defaultCat) => {
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
      res.forEach((item) => {
        if (item.selected) {
          dispatch(setDefaultCat(item.token_id));
        }
      });
    });
  }, [address]);

  return <>{children}</>;
}
