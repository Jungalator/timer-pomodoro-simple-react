export const Progressbar = ({ progressRef, timeLeft, totalTime }) => {
  const percent = ((totalTime - timeLeft) / totalTime) * 100;
  return (
    <div className="w-[90%] h-4 overflow-hidden border-0 rounded-2xl text-neutral-700 text-center text-sm relative mb-10">
      <span className="absolute top-[-30%] text-lg z-50">
        {percent > 0 && `${percent.toFixed()}%`}
      </span>
      <div
        ref={progressRef}
        className="h-[100%] bg-white transition-width duration-300 easy-in-out border-0 rounded-2xl  "
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};
