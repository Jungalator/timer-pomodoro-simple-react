import { NavButton } from "./NavButton";

export const Nav = ({ toggleVisible, setVisibleSettings, setVisibleStats }) => {
  return (
    <nav className="ml-auto flex justify-end w-[100%]">
      <NavButton
        toggleVisible={() => toggleVisible(setVisibleStats)}
        buttonIcon="☑︎"
        buttonTitle="Statistics"
      />
      <NavButton
        toggleVisible={() => toggleVisible(setVisibleSettings)}
        buttonIcon="⚙︎"
        buttonTitle="Setting"
      />
    </nav>
  );
};
