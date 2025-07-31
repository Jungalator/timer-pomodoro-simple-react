import { useState, useRef, useEffect } from "react";
import { Controls } from "./Controls/Controls";
import {
  handleStartTimer,
  handlePauseTimer,
  handleRestartTimer,
} from "../helpers/ControlsFuncs";
import { Sessions } from "./Sessions/Sessions";
import { Progressbar } from "./Progressbar/Progressbar";
import { CompletedPomodoros } from "./CompletedPomodoros/CompletedPomodoros";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Toaster, toast } from "sonner";
import { SettingButton } from "./Setting/SettingButton";
import { Setting } from "./Setting/Setting";
import { toggleSetting } from "../helpers/toggleSetting";
import { getTimeByMod } from "../helpers/getTimeByMode";
import { playSound } from "../helpers/playSounds";

export const Timer = () => {
  const [localValue, setLocalValue] = useLocalStorage("completedPomodors", "");
  const [localTime, setLocalTime] = useLocalStorage("timers", "");

  const [time, setTime] = useState(
    localTime
      ? { ...localTime }
      : {
          pomodoro: 25 * 60,
          shortBreak: 5 * 60,
          longBreak: 15 * 60,
        }
  );
  const [timeLeft, setTimeLeft] = useState(time.pomodoro);
  const [totalTime, setTotalTime] = useState(time.pomodoro);
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

  const setSession = (mode) => {
    setTimeLeft(getTimeByMod(time, mode));
    setTotalTime(getTimeByMod(time, mode));
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
    playSound("/audio/cleanWhoosh.mp3");
    const newMod = e.target.id;
    setMode(newMod);
    setSession(newMod);
  };

  const handleCleanLocalStorage = () => {
    setLocalValue([]);
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
    setLocalTime({ ...time });
    setTimeLeft(time.pomodoro);
    setTotalTime(time.pomodoro);
    toggleSetting(setVisibleSettings);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      playSound("/audio/notificationBell.mp3");
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
      <Setting
        visibleSetting={visibleSetting}
        toggleSetting={() => toggleSetting(setVisibleSettings)}
        handleChangeTime={handleChangeTime}
        handleSubmitForm={handleSubmitForm}
        localTime={localTime}
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
        <SettingButton
          toggleSetting={() => toggleSetting(setVisibleSettings)}
        />

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
