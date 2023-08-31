import noticeImg from "@/assets/icon/notice.svg";
import closeImg from "@/assets/icon/close.svg";
import "./index.scss";
import { useEffect, useState } from "react";
import useTypewriter from "react-typewriter-hook";
const notices = [
  "Meow there, hooman! Missed me?",
  "Purr... You're back! Ready for some cuddles?",
  "Awake already? I was dreaming of fish just now.",
  "Hooman! I've been waiting for you. What took you so long?",
  "Every time you return, my whiskers tingle with happiness.",
  "Back for more of my feline charm? I knew you couldn't resist!",
  "There you are! I was starting to think you'd been catnapped.",
  "Seeing you always puts a purr in my heart.",
  "You're home! Quick, tell me about your day. After some head scratches, of course.",
  "Hey there! Ready for another purrfect day together?",
];

export default function notice(props: { visible: any; onClose: any }) {
  const [noticeText, setNoticeText] = useState("");
  const typing = useTypewriter(noticeText);
  let visible = props.visible;

  useEffect(() => {
    if (visible) {
      let index = Math.floor(Math.random() * notices.length);
      setNoticeText(notices[index]);
    } else {
      setNoticeText("");
    }
  }, [visible]);
  return (
    visible && (
      <div className="notice absolute">
        <div className="w-full h-full relative flex items-center justify-center">
          <img className="absolute left-0 top-0" src={noticeImg} alt="" />
          <img
            className="absolute right--4px top--4px w-20px h-20px"
            src={closeImg}
            alt=""
            onClick={() => props.onClose(false)}
          />
          <div className="color-black relative z-2 px-10px">{typing}</div>
        </div>
      </div>
    )
  );
}
