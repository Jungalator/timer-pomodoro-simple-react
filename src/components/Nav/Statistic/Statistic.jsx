import { Modal } from "../../Modal/Modal";
import { TodayStats } from "./TodayStats.jsx/TodayStats";
import { WeekStatistic } from "./WeekStatistic/WeekStatistic";
export const Statistic = ({
  visibleStats,
  toggleVisible,
  dayStat,
  localWeekStats,
}) => {
  return (
    <Modal
      isVisible={visibleStats}
      toggleVisible={toggleVisible}
      childrenTitle="STATISTICS"
    >
      <TodayStats dayStat={dayStat} />
      <WeekStatistic localWeekStats={localWeekStats} />
    </Modal>
  );
};
