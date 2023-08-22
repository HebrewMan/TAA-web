import { Image } from "react-vant";
import taaImg from "@/assets/bakeground/taa.png";
import ethImg from "@/assets/bakeground/eth.png";
import hotImg from "@/assets/bakeground/hot.png";
import "./index.scss";
export default function index(props: { item: any }) {
  const item = props.item;

  return (
    <div className="market-item relative cursor-pointer">
      <Image
        className="important-absolute top--8px left--8px z-2"
        width="36"
        height="auto"
        lazyload={true}
        src={hotImg}
      />
      <div className="top">
        <Image width="100%" height="100%" lazyload src={item.image as string} />
      </div>
      <div className="bottom flex items-center h-15px mt-2px pr-10px">
        <span className="days-one color-#402209 mr-4px text-14px">
          {item.name}
        </span>
        <span className="days-one color-#BB7A3A text-10px">
          #{item.token_id}
        </span>
      </div>
      <div className="flex mt-2px justify-between w-130px pl-7px mt-7px">
        <div className="relative">
          <Image
            className="important-absolute left--10px top--4px"
            width="26"
            height="24"
            src={taaImg}
          />
          <div className="w-54px h-16px text-center bg-#ECA756 rounded-8px days-one box-border leading-16px pl-8px color-#402209 text-12px">
            10
          </div>
        </div>
        <div className="relative">
          <Image
            className="important-absolute left--10px top--4px"
            width="26"
            height="24"
            src={ethImg}
          />
          <div className="w-54px h-16px text-center bg-#FFAD7E rounded-8px days-one box-border leading-16px pl-8px color-#402209 text-12px">
            10
          </div>
        </div>
      </div>
    </div>
  );
}
