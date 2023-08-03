import React, { useEffect, useState } from "react";
import "./index.scss";
import { Switch } from "react-vant";
import { Image as VanImage } from "react-vant";
import { getMyCats, startWork } from "@/api/feature/cat";
import { useAccount } from "wagmi";
const MyNFT = () => {
  const { address } = useAccount();
  const [myNFTs, setMyNFTS] = useState([]);

  const switchChange = (val: boolean, item: any) => {
    if (val) {
      startWork({
        address,
        token_id: item.token_id,
      }).then((res: any) => {});
    }
  };

  const getMarkets = () => {
    getMyCats(address as string).then((res: any) => {
      console.log(res);
      setMyNFTS(res);
    });
  };

  useEffect(() => {
    getMarkets();
  }, []);

  return (
    <>
      <div className="my-nft">
        <div className="main">
          {myNFTs.map((item: any) => (
            <div className="item" key={item.token_id}>
              <div className="top relative">
                <span className="absolute z-2 left-0px top-0">Resting</span>
                <VanImage
                  className="important-absolute left-0 top-0"
                  width="135"
                  height="117"
                  src={item.image}
                />
              </div>
              <div className="bottom">
                <span className="days-one">{item.name}</span>
                <span className="days-one">#001</span>
                <div className="ml-auto">
                  <Switch
                    defaultChecked={item.work_status}
                    size="12px"
                    activeColor="#7AD170"
                    inactiveColor="#935C33"
                    onChange={(val) => switchChange(val, item)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyNFT;
