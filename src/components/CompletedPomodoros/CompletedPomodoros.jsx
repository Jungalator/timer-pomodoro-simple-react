export const CompletedPomodoros = ({ completedPomodoros }) => {
  return (
    <article className="flex  w-[40%] ">
      <p className="font-semibold text-lg text-white mr-3.5 ml-6">
        {`Completed pomodoros: ${
          (completedPomodoros > 0 && completedPomodoros) || 0
        }`}
      </p>
    </article>
  );
};
