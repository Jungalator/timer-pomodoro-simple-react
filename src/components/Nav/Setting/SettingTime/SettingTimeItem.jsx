export const SettingTimeItem = ({
  time,
  handleChangeTime,
  labelTitle,
  inputName,
}) => {
  return (
    <li className="w-[25%]">
      <label className="w-[100%]">
        <p className="text-neutral-500 font-semibold">{labelTitle}</p>
        <input
          name={inputName}
          value={Math.floor(time / 60)}
          type="number"
          onChange={handleChangeTime}
          className="bg-neutral-200 text-neutral-700 font-semibold text-center w-[100%] h-8 border-0 rounded-lg"
        />
      </label>
    </li>
  );
};
