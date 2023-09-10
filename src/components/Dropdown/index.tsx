import { useEffect, useState } from "react";
import { DropdownMenu } from "react-vant";
import rightIcon from "@/assets/icon/right.svg";
import "./index.scss";
export default function dropDown(props: {
  option: any;
  setOption: any;
  defaultValue?: any;
}) {
  const option = props.option;
  const setOption = props.setOption;
  const [value, setValue] = useState<Record<string, string | number>>({
    value: props.defaultValue,
  });
  useEffect(() => {
    setOption(value.value);
  }, [value]);
  const rightDom = () => {
    return <img className="mt-6px" src={rightIcon} alt="" />;
  };
  return (
    <DropdownMenu
      overlay={false}
      activeIcon={rightDom()}
      value={value}
      onChange={(v) => setValue(v)}
    >
      <DropdownMenu.Item name="value" options={option} />
    </DropdownMenu>
  );
}
