import { Switcher } from "../../../Switcher/Switcher";

export const SettingSound = ({ onChangeFunc, switcherValue }) => {
  return (
    <div className="flex flex-col">
      <h4 className="labelTitle">Sound</h4>
      <div className="flex flex-col justify-end items-end">
        <span className="mr-1.5 mb-2 text-md font-semibold text-neutral-500">
          Off/On
        </span>
        <Switcher onChangeFunc={onChangeFunc} switcherValue={switcherValue} />
      </div>
    </div>
  );
};
