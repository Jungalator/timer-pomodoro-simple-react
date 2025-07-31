import { SessionButton } from "./SessionButton";
export const Sessions = ({ choiceMode, mode }) => {
  return (
    <div onClick={choiceMode} className="mb-10">
      <SessionButton
        mode={mode}
        sessionBtnId="pomodoro"
        sessionBtnName="Pomodoro"
      />
      <SessionButton
        mode={mode}
        sessionBtnId="short-break"
        sessionBtnName="Short Break"
      />
      <SessionButton
        mode={mode}
        sessionBtnId="long-break"
        sessionBtnName="Long Break"
      />
    </div>
  );
};
