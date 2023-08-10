import { getUserInfo } from "@/api/feature/app";
import { useEffect } from "react";
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
let useContractWriteFlag = true;
export default function UseWeb3Provider({ children }: any) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { defaultCat } = useRootSelector(selectCatSlice);
  // const { config } = usePrepareContractWrite({
  //   address: "0x76FcD0cC9b90168EF589Bb79a1a9de25A3A99178",
  //   abi: taakAbi,
  //   functionName: "mint",
  //   args: [10, "0x"],
  // });
  // const { data, isLoading, isSuccess, write } = useContractWrite(config);
  // useEffect(() => {
  //   if (useContractWriteFlag && write) {
  //     useContractWriteFlag = false;
  //     // write();
  //   }
  //   console.log(data);
  // }, [data, isLoading, isSuccess, write]);

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
    if (!address) {
      dispatch(setIsLogin(false));
    }
    if (!address || flag) {
      return;
    }
    dispatch(setIsLogin(true));
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
