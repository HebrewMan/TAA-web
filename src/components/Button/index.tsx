import "./index.scss";
export default function Button({ bgColor1, bgColor2, text, size, status = 1 }) {
  return (
    <div
      className="taa-button w-full h-full days-one relative flex justify-center items-center"
      style={{ background: bgColor1 }}
    >
      <div
        className="taa-button-bg absolute w-full h-full"
        style={{ background: bgColor2 }}
      ></div>
      <span
        style={{ fontSize: size }}
        className="relative z-2 font-shadow-black select-none"
      >
        {text}
      </span>
      {status == 0 && <div className="button-mask1 w-full h-full"></div>}
    </div>
  );
}
