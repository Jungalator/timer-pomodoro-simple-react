import { SettingForm } from "./SettingForm/SettingUtls.jsx/SettingForm";
import { Modal } from "../../Modal/Modal";
export const Setting = ({
  visibleSetting,
  handleSubmitForm,
  handleChangeTime,
  toggleVisible,
  handleSoundOn,
  soundSwitcherValue,
  leftTime,
  localTime,
  time,
}) => {
  return (
    <Modal
      isVisible={visibleSetting}
      toggleVisible={toggleVisible}
      childrenTitle="SETTING"
    >
      <SettingForm
        handleSubmitForm={handleSubmitForm}
        handleChangeTime={handleChangeTime}
        onChangeFunc={handleSoundOn}
        switcherValue={soundSwitcherValue}
        leftTime={leftTime}
        localTime={localTime}
        time={time}
      />
    </Modal>
  );
};
