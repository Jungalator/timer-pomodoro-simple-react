export const Sessions = ({ choiceMode, mode }) => {
  const sessionStyle =
    "text-white text-lg px-2.5 py-2 rounded-lg cursor-pointer font-semibold";

  return (
    <div onClick={choiceMode} className="mb-10">
      <button
        className={
          (mode === "pomodoro" &&
            sessionStyle + " bg-red-800/40 cursor-pointer") ||
          sessionStyle
        }
        id="pomodoro"
      >
        Pomodoro (25 min)
      </button>
      <button
        className={
          (mode === "short-break" && sessionStyle + " bg-red-800/40 ") ||
          sessionStyle
        }
        id="short-break"
      >
        Short break (5 min)
      </button>
      <button
        className={
          (mode === "long-break" && sessionStyle + " bg-red-800/40") ||
          sessionStyle
        }
        id="long-break"
      >
        Break (15 min)
      </button>
    </div>
  );
};
