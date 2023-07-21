import noticeImg from "@/assets/icon/notice.svg";
import closeImg from "@/assets/icon/close.svg";
import "./index.scss";
export default function notice(props: { visible: any; onClose: any }) {
  let visible = props.visible;
  return (
    visible && (
      <div className="notice absolute">
        <div className="w-full h-full relative">
          <img className="absolute left-0 top-0" src={noticeImg} alt="" />
          <img
            className="absolute right--4px top--4px w-20px h-20px"
            src={closeImg}
            alt=""
            onClick={() => props.onClose(false)}
          />
          <div></div>
        </div>
      </div>
    )
  );
}
