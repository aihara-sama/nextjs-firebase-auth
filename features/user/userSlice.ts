import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  uid: string;
  email: string;
}

interface State {
  user?: User;
}

const initialState: State = {
  user: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    // Actions
    setUser(state, action: PayloadAction<State['user']>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = undefined;
    },
  },
});

export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;
