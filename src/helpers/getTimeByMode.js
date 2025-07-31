export const getTimeByMod = (time, mode) => {
  switch (mode) {
    case "short-break":
      return time.shortBreak;
    case "long-break":
      return time.longBreak;
    case "pomodoro":
    default:
      return time.pomodoro;
  }
};
