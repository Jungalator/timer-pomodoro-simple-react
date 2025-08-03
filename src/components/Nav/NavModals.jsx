import { Statistic } from "./Statistic/Statistic";
import { Setting } from "./Setting/Setting";
export const NavModals = (props) => {
  return (
    <>
      <Setting
        visibleSetting={props.visibleSetting}
        toggleVisible={props.toggleVisibleSetting}
        handleChangeTime={props.handleChangeTime}
        handleSubmitForm={props.handleSubmitForm}
        handleSoundOn={props.handleSoundOn}
        soundSwitcherValue={props.soundSwitcherValue}
        localTime={props.localTime}
        time={props.time}
      />
      <Statistic
        dayStat={props.dayStat}
        toggleVisible={props.toggleVisibleStats}
        visibleStats={props.visibleStats}
      />
    </>
  );
};
