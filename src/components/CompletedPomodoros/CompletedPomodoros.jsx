export const CompletedPomodoros = ({
  completedPomodoros,
  handleCleanLocalStorage,
}) => {
  return (
    <article className="flex  w-[40%] ">
      <p className="font-semibold text-lg text-white mr-3.5 ml-6">
        {`Completed pomodoros: ${
          (completedPomodoros > 0 && completedPomodoros) || 0
        }`}
      </p>
      <button
        onClick={handleCleanLocalStorage}
        className="text-white text-lg cursor-pointer hover:text-neutral-300"
      >
        ⌫
      </button>
    </article>
  );
};
