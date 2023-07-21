import salaryImg from "@/assets/bakeground/salary_title.png";
import salarybtnImg from "@/assets/bakeground/salary_btn.png";
import lineImg from "@/assets/icon/line.svg";
export default function salary(props) {
  return (
    <div className="flex flex-col justify-center items-center h-full butter-sans-text ">
      <img className="mb--25px relative z-2" src={salaryImg} alt="" />
      <div className="w-255px h-292px rounded-20px bg-#FFD28E px-12px pt-12px pb-14px">
        <div className="bg-#FFEFD7 rounded-20px w-full h-full ">
          <div className="min-w-186px flex flex-col justify-center items-center pt-25px">
            <div className="w-168px">
              <div className="text-15px font-shadow-black w-50px w-168px">
                Unclaimed Salary:
              </div>
            </div>
            <div className="text-32px color-#402209 w-168px my-20px">
              178112345
            </div>
            <div className="flex items-end w-168px ">
              <span className="inline-block w-50px font-shadow-black ">
                Claimed Salary:{" "}
              </span>
              <span className="color-#402209 ml-20px">11112345</span>
            </div>
            <img src={lineImg} alt="" className="mt-20px" />
            <div className="text-12px color-#402209 text-center mt-10px w-135px">
              Today's Salary Pool 875
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24px w-287px h-60px relative cursor-pointer">
        <img className="absolute" src={salarybtnImg} alt="" />
        <i
          className="absolute z-2 top-28px  text-after text-20px font-shadow-black"
          onClick={props.onClose}
        >
          Claim
        </i>
      </div>
    </div>
  );
}
