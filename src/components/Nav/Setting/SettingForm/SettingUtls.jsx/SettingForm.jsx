import { SettingTime } from "../../SettingTime/SettingTime";
import { SettingSound } from "../../SettingSound/SettingSound";
export const SettingForm = ({
  handleSubmitForm,
  handleChangeTime,
  onChangeFunc,
  switcherValue,
  localTime,
  time = { time },
}) => {
  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col justify-between h-[85%] "
    >
      <SettingTime
        handleChangeTime={handleChangeTime}
        localTime={localTime}
        time={time}
      />
      <SettingSound onChangeFunc={onChangeFunc} switcherValue={switcherValue} />
      <button
        type="submit"
        className="text-neutral-600 font-semibold w-[30%] py-2 mx-auto bg-gray-300 hover:bg-gray-400/70 rounded-lg cursor-pointer"
      >
        Ok
      </button>
    </form>
  );
};
