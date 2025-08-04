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
import { toggleVisible } from "../helpers/toggleVisible";
import { getTimeByMod } from "../helpers/getTimeByMode";
import { playSound } from "../helpers/playSounds";
import { handleSoundOn } from "../helpers/handleSoundOn";
import { setDayStatistic } from "../helpers/setDayStatistic";
import { Nav } from "./Nav/Nav";
import { NavModals } from "./Nav/NavModals";

export const Timer = () => {
  const defultTime = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };
  const initialDayStat = {
    date: `${new Date().getDate().toString().padStart(2, "0")}-${new Date()
      .getMonth()
      .toString()
      .padStart(2, "0")}-${new Date().getFullYear()}`,
    weekDay: new Date().getDay(),
    pomodoros: 0,
  };

  const [localTime, setLocalTime] = useLocalStorage("timers", defultTime);
  const [localSoundOn, setLocalSoundOn] = useLocalStorage("soundOn", false);
  const [localWeekStats, setLocalWeekStats] = useLocalStorage(
    "localWeekStats",
    []
  );

  const [time, setTime] = useState(localTime ? { ...localTime } : defultTime);

  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(getTimeByMod(time, mode));
  const [totalTime, setTotalTime] = useState(getTimeByMod(time, mode));
  const [visibleSetting, setVisibleSettings] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const [soundSwitcherValue, setSoundSwitcherValue] = useState(
    localSoundOn ? localSoundOn : false
  );
  const [dayStat, setDayStat] = useState(() => {
    const savedWeek = Array.isArray(localWeekStats) ? localWeekStats : [];
    const sameDay = savedWeek.find((d) => d.date === initialDayStat.date);
    return sameDay ?? initialDayStat;
  });
  const [weekStat, setWeekStat] = useState(localWeekStats ?? []);
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const timerRef = useRef(null);
  const lastTimeRef = useRef(null);
  const progressRef = useRef(null);

  const setSession = (mode) => {
    setTimeLeft(getTimeByMod(time, mode) ?? 25 * 60);
    setTotalTime(getTimeByMod(time, mode) ?? 25 * 60);
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
    soundSwitcherValue && playSound("audio/cleanWhoosh.mp3");
    const newMod = e.target.id;
    setMode(newMod);
    setSession(newMod);
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
    setLocalSoundOn(soundSwitcherValue);
    setTimeLeft(getTimeByMod(time, mode));
    setTotalTime(getTimeByMod(time, mode));
    toggleVisible(setVisibleSettings);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      stopTimer();
      switch (mode) {
        case "pomodoro":
          setDayStatistic(setDayStat, setWeekStat);

          if (dayStat.pomodoros < 4) {
            switchSession(time.shortBreak, "short-break");
            soundSwitcherValue && playSound("audio/notificationBell.mp3");
            return handleStartTimer(
              timerRef,
              setTimeLeft,
              timeLeft,
              lastTimeRef
            );
          } else {
            switchSession(time.longBreak, "long-break");
            soundSwitcherValue && playSound("audio/notificationBell.mp3");
            return handleStartTimer(
              timerRef,
              setTimeLeft,
              timeLeft,
              lastTimeRef
            );
          }

        case "short-break" || "long-break":
          switchSession(time.pomodoro, "pomodoro");
          soundSwitcherValue && playSound("audio/singleBell.mp3");
          return handleStartTimer(timerRef, setTimeLeft, timeLeft, lastTimeRef);
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    switch (dayStat.pomodoros) {
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
  }, [dayStat]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    setLocalWeekStats(weekStat);
  }, [weekStat]);

  return (
    <>
      <NavModals
        visibleSetting={visibleSetting}
        toggleVisibleSetting={() => toggleVisible(setVisibleSettings)}
        toggleVisibleStats={() => toggleVisible(setVisibleStats)}
        handleChangeTime={handleChangeTime}
        handleSubmitForm={handleSubmitForm}
        handleSoundOn={() => handleSoundOn(setSoundSwitcherValue)}
        soundSwitcherValue={soundSwitcherValue}
        localTime={localTime}
        time={time}
        dayStat={dayStat}
        visibleStats={visibleStats}
        localWeekStats={localWeekStats}
      />
      <main
        className={`h-[100vh] w-[100vw] overflow-y-scroll duration-300 ease-in-out ${
          (mode === "pomodoro" && "bg-red-900/80") ||
          (mode === "short-break" && "bg-blue-900/80") ||
          (mode === "long-break" && "bg-green-900/80")
        }  pt-10`}
      >
        <div
          className={`mx-auto w-[70%] mb-15  border-0 p-5 duration-300 ease-in-out  flex flex-col items-center rounded-xl  shadow-md shadow-black ${
            (mode === "pomodoro" && "bg-red-500/30") ||
            (mode === "short-break" && "bg-blue-500/30") ||
            (mode === "long-break" && "bg-green-500/30")
          }`}
        >
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
          <Nav
            toggleVisible={toggleVisible}
            setVisibleSettings={setVisibleSettings}
            setVisibleStats={setVisibleStats}
          />
          <Progressbar
            progressRef={progressRef}
            timeLeft={timeLeft}
            totalTime={totalTime}
          />
          <Sessions choiceMode={choiceMode} mode={mode} />
          <p className="text-9xl font-semibold text-white mb-10 inline-block ">
            {minutes}:{seconds}
          </p>

          <Controls
            handleStartTimer={() =>
              handleStartTimer(
                timerRef,
                setTimeLeft,
                timeLeft,
                lastTimeRef,
                soundSwitcherValue
              )
            }
            handlePauseTimer={() =>
              handlePauseTimer(stopTimer, soundSwitcherValue)
            }
            handleRestartTimer={() =>
              handleRestartTimer(
                setSession,
                stopTimer,
                mode,
                soundSwitcherValue
              )
            }
          />

          <CompletedPomodoros completedPomodoros={dayStat.pomodoros} />
        </div>
      </main>
    </>
  );
};
