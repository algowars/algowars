import { Role } from "@/features/auth/auth-roles/role";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RolesState {
  roles: Role[];
}

const initialState: RolesState = {
  roles: [],
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
  },
});

export const { setRoles } = rolesSlice.actions;

export default rolesSlice.reducer;
