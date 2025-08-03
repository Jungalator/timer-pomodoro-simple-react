export const setDayStatistic = (setDayStat, setWeekStat) => {
  setDayStat((prev) => {
    const updatedDay = {
      ...prev,
      pomodoros: prev.pomodoros + 1,
    };

    setWeekStat((prevWeek) => {
      const sameDayIndex = prevWeek.findIndex(
        (item) => item.date === updatedDay.date
      );

      if (sameDayIndex >= 0) {
        return prevWeek.map((item, idx) =>
          idx === sameDayIndex ? updatedDay : item
        );
      } else {
        return [...prevWeek, updatedDay].slice(-7);
      }
    });
    return updatedDay;
  });
};
