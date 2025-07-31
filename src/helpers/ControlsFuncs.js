import { playSound } from "./playSounds";
// Controls of timer (start, pause, reset)

export const handleStartTimer = (
  timerRef,
  setTimeLeft,
  timeLeft,
  lastTimeRef
) => {
  if (timerRef.current) return;
  lastTimeRef.current = timeLeft;

  timerRef.current = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev > 0) {
        lastTimeRef.current = prev - 1;
        return prev - 1;
      }
    });
  }, 1000);
  playSound("/audio/buttonPress.mp3");
};

export const handlePauseTimer = (stopTimer) => {
  stopTimer();
  playSound("/audio/buttonPress.mp3");
};

export const handleRestartTimer = (setSession, stopTimer, mode) => {
  setSession(mode);
  stopTimer();
  playSound("/audio/buttonPress.mp3");
};
