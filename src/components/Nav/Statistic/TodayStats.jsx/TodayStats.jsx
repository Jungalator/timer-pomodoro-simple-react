export const TodayStats = ({ dayStat }) => {
  return (
    <article>
      <h4 className="mt-3 mb-3 text-neutral-600 font-semibold">
        Today's statistics
      </h4>
      <div className="flex items-center mb-5">
        <p className="text-neutral-500 font-semibold">
          Completed pomodors today: {dayStat.pomodoros}
        </p>
        <span className="ml-2 text-green-600 font-semibold text-lg">
          {dayStat.pomodoros > 0 && "✓"}
        </span>
      </div>
      <hr className="text-neutral-400" />
    </article>
  );
};
