export const Modal = ({
  isVisible,
  toggleVisible,
  children,
  childrenTitle,
}) => {
  return (
    <div
      className={
        isVisible
          ? "fixed block w-[100vw] h-[100vh] bg-neutral-900/50 overflow-y-scroll opacity-100 transition-all transition-discrete z-90"
          : "hidden opacity-0 transition-all transition-discrete"
      }
    >
      <dialog
        className="px-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vh] w-[40vw] bg-white border-0 rounded-xl z-99  "
        open
      >
        <h2 className="text-center mt-3 mb-5 text-neutral-600 font-semibold">
          {childrenTitle}
        </h2>
        <button
          onClick={toggleVisible}
          className="absolute top-3 right-4 text-lg text-neutral-500 font-bold hover:bg-neutral-200 w-7 h-7 rounded-md cursor-pointer"
        >
          ✕
        </button>
        {children}
      </dialog>
    </div>
  );
};
