import { Image } from "react-vant";
import experienceImg from "@/assets/bakeground/experience.svg";
import priceImg from "@/assets/bakeground/price.svg";
import hotImg from "@/assets/bakeground/hot.png";
import "./index.scss";
export default function index(props: { item: any }) {
  const item = props.item;

  return (
    <div className="market-item relative cursor-pointer">
      <Image
        className="absolute top--8px left--8px z-2"
        width="36"
        height="auto"
        src={hotImg}
      />
      <div className="top">
        <Image width="100%" height="100%" lazyload src={item.image as string} />
      </div>
      <div className="bottom flex items-center justify-center">
        <span className="days-one color-#402209 mr-4px text-14px">
          {item.name}
        </span>
        <span className="days-one color-#BB7A3A text-10px">#001</span>
      </div>
      <div className="flex mt-2px justify-between w-130px pl-7px">
        <div className="relative">
          <Image
            className="absolute left--10px top--5px"
            width="26"
            height="26"
            src={experienceImg}
          />
          <div className="w-54px h-16px bg-#ECA756 rounded-8px days-one box-border leading-16px pl-8px color-#402209 text-13px">
            10
          </div>
        </div>
        <div className="relative">
          <Image
            className="absolute left--10px top--5px"
            width="26"
            height="26"
            src={priceImg}
          />
          <div className="w-54px h-16px bg-#FFAD7E rounded-8px days-one box-border leading-16px pl-8px color-#402209 text-13px">
            10
          </div>
        </div>
      </div>
    </div>
  );
}
