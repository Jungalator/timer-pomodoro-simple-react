import { SettingTimeItem } from "./SettingTimeItem";

export const SettingTime = ({ handleChangeTime, time }) => {
  return (
    <div className="">
      <h4 className="labelTitle mb-5">Time</h4>
      <ul className=" flex justify-between text-center">
        <SettingTimeItem
          handleChangeTime={handleChangeTime}
          time={time.pomodoro}
          inputName="pomodoro"
          labelTitle="Pomodoro"
        />
        <SettingTimeItem
          handleChangeTime={handleChangeTime}
          time={time.shortBreak}
          inputName="shortBreak"
          labelTitle={"Short Break"}
        />
        <SettingTimeItem
          handleChangeTime={handleChangeTime}
          time={time.longBreak}
          inputName="longBreak"
          labelTitle="Long Break"
        />
      </ul>
    </div>
  );
};
