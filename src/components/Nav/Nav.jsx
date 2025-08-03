import { NavButton } from "./NavButton";

export const Nav = ({ toggleVisible, setVisibleSettings, setVisibleStats }) => {
  return (
    <nav className="ml-auto flex justify-around w-[40%]">
      <NavButton
        toggleVisible={() => toggleVisible(setVisibleStats)}
        buttonIcon="☑︎"
        buttonTitle="Statistic"
      />
      <NavButton
        toggleVisible={() => toggleVisible(setVisibleSettings)}
        buttonIcon="⚙︎"
        buttonTitle="Setting"
      />
    </nav>
  );
};
