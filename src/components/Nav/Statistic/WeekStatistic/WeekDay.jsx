export const WeekDay = ({ reorderedStats, day, idx }) => {
  const date = reorderedStats[idx]?.date ?? "";

  return (
    <li className="flex flex-col text-center">
      <p className="text-xs text-neutral-600">{date.slice(0, 5)}</p>
      <p className="text-neutral-500 font-semibold mb-1.5">{day}</p>
      <p
        className={
          reorderedStats[idx]?.pomodoros > 0
            ? "text-green-600 font-semibold"
            : "text-red-700/80 font-semibold"
        }
      >
        {reorderedStats[idx]?.pomodoros ?? 0}
      </p>
    </li>
  );
};
