import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
