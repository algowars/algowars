import { Player } from "@/features/player/player";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  player: Player;
}

const initialState: PlayerState = {
  player: {
    id: "",
    name: "",
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => {
      state.player = action.payload;
    },
  },
});

export const { setPlayer } = playerSlice.actions;

export default playerSlice.reducer;
