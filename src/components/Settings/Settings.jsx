import { SettingForm } from "./SettingForm/SettingForm";

export const Settings = ({
  visibleSetting,
  handleSubmitForm,
  handleChangeTime,
  handleOpenSettings,
  leftTime,
  time,
}) => {
  return (
    <div
      className={
        visibleSetting
          ? "fixed block w-[100vw] h-[100vh] bg-neutral-900/50 overflow-y-scroll "
          : "hidden"
      }
    >
      <dialog
        className="px-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vh] w-[40vw] bg-white border-0 rounded-xl z-99"
        open
      >
        <h2 className="text-center mt-3 mb-5 text-neutral-500 font-semibold">
          SETTING
        </h2>
        <button
          onClick={handleOpenSettings}
          className="absolute top-3 right-4 text-lg text-neutral-500 font-bold hover:bg-neutral-200 w-7 h-7 rounded-md cursor-pointer"
        >
          ✕
        </button>

        <SettingForm
          handleSubmitForm={handleSubmitForm}
          handleChangeTime={handleChangeTime}
          leftTime={leftTime}
          time={time}
        />
      </dialog>
    </div>
  );
};
