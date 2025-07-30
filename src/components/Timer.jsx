import { useState, useRef, useEffect } from "react";
import { Controls } from "./Controls/Controls";
import {
  handleStartTimer,
  handlePauseTimer,
  handleRestartTimer,
} from "./Controls/ControlsFuncs";
import { Sessions } from "./Sessions/Sessions";
import { Progressbar } from "./Progressbar/Progressbar";
import { CompletedPomodoros } from "./CompletedPomodoros/CompletedPomodoros";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Toaster, toast } from "sonner";
import { SettingsButton } from "./Settings/SettingsButton";
import { Settings } from "./Settings/Settings";

export const Timer = () => {
  const [time, setTime] = useState({
    pomodoro: 25 * 60,
    shortBreak: 1 * 60,
    longBreak: 15 * 60,
  });
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [mode, setMode] = useState("pomodoro");
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [visibleSetting, setVisibleSettings] = useState(false);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const timerRef = useRef(null);
  const lastTimeRef = useRef(null);
  const progressRef = useRef(null);

  const [localValue, setLocalValue] = useLocalStorage("completedPomodors", "");

  const getTimeByMod = (mode) => {
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

  const setSession = (mode) => {
    setTimeLeft(getTimeByMod(mode));
    setTotalTime(getTimeByMod(mode));
  };

  const switchSession = (seconds, newMode) => {
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setMode(newMode);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const choiceMode = (e) => {
    const newMod = e.target.id;
    setMode(newMod);
    setSession(newMod);
  };

  const handleCleanLocalStorage = () => {
    setLocalValue([]);
  };

  const handleOpenSettings = () => {
    setVisibleSettings((prev) => !prev);
  };

  const handleChangeTime = (e) => {
    const { name, value } = e.target;

    setTime((prev) => ({
      ...prev,
      [name]: value * 60,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (timeLeft === 0) {
      stopTimer();
      switch (mode) {
        case "pomodoro":
          return setCompletedPomodoros((prev) => {
            let nextCount = prev + 1;
            setLocalValue(nextCount);

            if (nextCount > 0 && nextCount < 4) {
              switchSession(time.shortBreak, "short-break");
              handleStartTimer(timerRef, setTimeLeft, timeLeft, lastTimeRef);
            } else {
              switchSession(time.longBreak, "long-break");
              handleStartTimer(timerRef, setTimeLeft, timeLeft, lastTimeRef);
            }
            return nextCount;
          });

        case "short-break" || "long-break":
          switchSession(time.pomodoro, "pomodoro");
          return handleStartTimer(timerRef, setTimeLeft, timeLeft, lastTimeRef);
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    switch (localValue) {
      case 1:
        toast.success("Nice job! First step is completed 💪🏼");
        break;
      case 2:
        toast.success("I see 👀 you're serious about this. Let's do it! 😎");
        break;
      case 3:
        toast.success(
          "Wow!🔥 You are very goal-oriented! Glad you are moving on! 🤩"
        );
        break;
      case 4:
        toast.success(
          "You are a machine 🦾! When you get out of the flow state, don't forget to take a little rest 🙃"
        );

        break;
    }
  }, [completedPomodoros]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <>
      <Settings
        visibleSetting={visibleSetting}
        handleOpenSettings={handleOpenSettings}
        handleChangeTime={handleChangeTime}
        handleSubmitForm={handleSubmitForm}
        time={time}
      />
      <div className="mx-auto w-[70%]  border-0 p-5 mt-10 flex flex-col items-center rounded-xl  shadow-md shadow-black bg-red-400/50">
        <Toaster
          position="top-right"
          expand={false}
          closeButton
          toastOptions={{
            style: {
              background: "#70c270",
              border: "none",
              color: "white",
            },
          }}
        />
        <SettingsButton handleOpenSettings={handleOpenSettings} />

        <Progressbar
          progressRef={progressRef}
          timeLeft={timeLeft}
          totalTime={totalTime}
        />
        <Sessions choiceMode={choiceMode} mode={mode} />
        <p className="text-9xl text-white mb-10 inline-block ">
          {minutes}:{seconds}
        </p>

        <Controls
          handleStartTimer={() =>
            handleStartTimer(timerRef, setTimeLeft, timeLeft, lastTimeRef)
          }
          handlePauseTimer={() => handlePauseTimer(stopTimer)}
          handleRestartTimer={() =>
            handleRestartTimer(setSession, stopTimer, mode)
          }
        />

        <CompletedPomodoros
          completedPomodoros={localValue}
          handleCleanLocalStorage={handleCleanLocalStorage}
        />
      </div>
    </>
  );
};
