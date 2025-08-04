export const CompletedPomodoros = ({ completedPomodoros }) => {
  return (
    <article className="flex  w-[100%%] ">
      <p className="font-semibold text-lg text-white mr-3.5 ml-6">
        {`Completed pomodoros today: ${
          (completedPomodoros > 0 && completedPomodoros) || 0
        }`}
      </p>
    </article>
  );
};
