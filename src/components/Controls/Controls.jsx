export const Controls = ({
  handleStartTimer,
  handlePauseTimer,
  handleRestartTimer,
}) => {
  const buttonStyle =
    "inline-block box-border px-7 border-0 rounded-[6px] h-10 shadow-md shadow-black focus:shadow-none leading-10 text-[17px] font-[600] text-white bg-neutral-600 hover:bg-neutral-700 cursor-pointer";
  return (
    <div className="w-[70%] mx-auto mb-15 flex justify-between">
      <button className={buttonStyle} onClick={handleRestartTimer}>
        Restart
      </button>
      <button className={buttonStyle} onClick={handlePauseTimer}>
        Pause
      </button>
      <button className={buttonStyle} onClick={handleStartTimer}>
        Start
      </button>
    </div>
  );
};
