import salaryImg from "@/assets/bakeground/salary_title.png";
import lineImg from "@/assets/icon/line.svg";
import { Image } from "react-vant";
import Button from "@/components/Button/index";
import { useRootSelector } from "@/store/hooks";
import { selectCatSlice } from "@/store/slices/catSlice";
import { catWorkInfo, claimTaa } from "@/api/feature/cat";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import taaImg from "@/assets/bakeground/taa.png";
export default function Salary(props: any) {
  const { address } = useAccount();
  const { defaultCat } = useRootSelector(selectCatSlice);
  const [salary, setSalary] = useState<any>({});
  const getInitData = () => {
    catWorkInfo(defaultCat).then((res) => {
      setSalary(res);
    });
  };

  useEffect(() => {
    getInitData();
  }, [defaultCat]);

  const onClick = () => {
    claimTaa({ address, tokenid: defaultCat }).then((res) => {
      getInitData();
      props.onClose();
    });
  };

  const closeHandle = () => {
    props.onClose();
  };

  const clickHandle = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-full butter-sans-text line-height-none"
      onClick={closeHandle}
    >
      <Image
        className="mb--25px relative z-2"
        width="287"
        height="auto"
        src={salaryImg}
        onClick={clickHandle}
      />
      <div
        className="w-255px h-292px box-border rounded-20px bg-#FFD28E px-12px pt-12px pb-14px"
        onClick={clickHandle}
      >
        <div className="bg-#FFEFD7 rounded-20px w-full h-full ">
          <div className="min-w-186px flex flex-col justify-center items-center pt-25px">
            <div className="w-168px">
              <div className="text-15px font-shadow-black w-full w-168px">
                Daily Check-in <br /> Claim your daily rewards:
              </div>
            </div>

            <div className="text-28px color-#402209 w-210px mt-20px mb-30px flex">
              <Image
                src={taaImg}
                width={30}
                height={30}
                className="mr-10px"
              ></Image>
              {salary.un_salary}
            </div>
            <div className="flex items-end w-168px ">
              <span className="inline-block w-50px font-shadow-black ">
                Claimed Salary:{" "}
              </span>
              <span className="color-#402209 ml-20px leading-10px">
                {salary.salary}
              </span>
            </div>
            <img src={lineImg} alt="" className="mt-30px" />
            <div className="text-12px color-#402209 text-center mt-10px w-135px leading-20px">
              Today's Salary Pool {salary.total_salary}
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-24px w-278px h-50px relative cursor-pointer"
        onClick={clickHandle}
      >
        <Button
          bgColor1="#AAC211"
          bgColor2="#bad60f"
          text="Claim"
          size="24px"
          onClick={onClick}
        ></Button>
      </div>
    </div>
  );
}
