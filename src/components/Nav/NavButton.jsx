export const NavButton = ({ toggleVisible, buttonIcon, buttonTitle }) => {
  return (
    <>
      <button
        onClick={toggleVisible}
        className="ml-4 flex items-center text-white hover:text-neutral-300  cursor-pointer font-semibold"
      >
        <span className="text-3xl h-10 mr-1.5">{buttonIcon}</span> {buttonTitle}
      </button>
    </>
  );
};
