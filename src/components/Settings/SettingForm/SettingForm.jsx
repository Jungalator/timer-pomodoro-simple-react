import { SettingTime } from "./SettingTime.jsx/SettingTime";

export const SettingForm = ({ handleSubmitForm, handleChangeTime, time }) => {
  return (
    <form onSubmit={handleSubmitForm}>
      <SettingTime handleChangeTime={handleChangeTime} time={time} />
      <button type="submit">Ok</button>
    </form>
  );
};
