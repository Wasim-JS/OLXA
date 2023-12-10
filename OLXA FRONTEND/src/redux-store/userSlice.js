import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    updateUserDataOnLogin(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      return state;
    },
    updateUserDataOnLogout(state) {
      state.isLoggedIn = false;
      state.user = [];
      return state;
    },
  },
});

export const { updateUserDataOnLogin, updateUserDataOnLogout } =
  usersSlice.actions;
export default usersSlice.reducer;
