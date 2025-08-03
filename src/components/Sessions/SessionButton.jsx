export const SessionButton = ({ mode, sessionBtnId, sessionBtnName }) => {
  const sessionBtnStyle =
    "text-white text-lg px-2.5 py-2 rounded-lg cursor-pointer font-semibold ";
  return (
    <button
      className={
        (mode === sessionBtnId &&
          sessionBtnStyle + " bg-neutral-800/30   cursor-pointer") ||
        sessionBtnStyle
      }
      id={sessionBtnId}
    >
      {sessionBtnName}
    </button>
  );
};
