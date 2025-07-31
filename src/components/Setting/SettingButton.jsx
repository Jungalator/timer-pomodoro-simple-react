export const SettingButton = ({ toggleSetting }) => {
  return (
    <>
      <button
        onClick={toggleSetting}
        className="ml-auto mr-5 flex items-center text-white hover:text-neutral-300  cursor-pointer font-semibold"
      >
        <span className="text-3xl h-10 mr-1.5">⚙︎</span> Setting
      </button>
    </>
  );
};
