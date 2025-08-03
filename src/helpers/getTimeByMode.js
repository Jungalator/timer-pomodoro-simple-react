export const getTimeByMod = (time, mode) => {
  switch (mode) {
    case "short-break":
      return time.shortBreak ?? 5 * 60;
    case "long-break":
      return time.longBreak ?? 15 * 60;
    case "pomodoro":
    default:
      return time.pomodoro ?? 25 * 60;
  }
};
