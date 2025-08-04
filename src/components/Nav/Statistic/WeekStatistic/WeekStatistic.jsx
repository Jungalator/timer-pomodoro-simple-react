import { WeekDay } from "./WeekDay";
export const WeekStatistic = ({ localWeekStats }) => {
  const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const reorderedStats = [1, 2, 3, 4, 5, 6, 0].map(
    (i) => localWeekStats.find((item) => item.weekDay === i) ?? { pomodoros: 0 }
  );
  return (
    <section>
      <h4 className="mt-3 mb-5 text-neutral-600 font-semibold">
        Statistics for the week
      </h4>
      <ul className="flex w-[100%] justify-between mb-5">
        {weekDays.map((day, idx) => {
          return (
            <WeekDay
              reorderedStats={reorderedStats}
              day={day}
              idx={idx}
              key={idx}
            />
          );
        })}
      </ul>
      <hr className="text-neutral-500" />
    </section>
  );
};
