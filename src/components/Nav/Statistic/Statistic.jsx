import { Modal } from "../../Modal/Modal";
import { TodayStats } from "./TodayStats.jsx/TodayStats";
export const Statistic = ({ visibleStats, toggleVisible, dayStat }) => {
  return (
    <Modal
      isVisible={visibleStats}
      toggleVisible={toggleVisible}
      childrenTitle="STATISTIC"
    >
      <TodayStats dayStat={dayStat} />
    </Modal>
  );
};
