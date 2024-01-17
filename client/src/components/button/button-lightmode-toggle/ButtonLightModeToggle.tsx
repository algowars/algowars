import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setLightMode, setDarkMode } from "../../../slices/themeSlice";
import ButtonLight from "../button-light/ButtonLight";

const ButtonLightModeToggle = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const changeTheme = () => {
    dispatch(theme === "dark" ? setLightMode() : setDarkMode());
  };
  return (
    <ButtonLight
      onClick={changeTheme}
      size="w-10 h-10"
      className="flex justify-center items-center"
      hideUnerline
    >
      <i
        className={`fa-lg fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`}
      ></i>
    </ButtonLight>
  );
};

export default ButtonLightModeToggle;
