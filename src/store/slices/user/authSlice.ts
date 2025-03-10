
import { IUserInterface } from "@/types/userSlice";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState:IUserInterface = {
  isLoading: false,
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading:(state:any,action:PayloadAction<{state: boolean}>) => {
      state.isLoading = action.payload.state
    },
    userRegistration: (state:any, action: PayloadAction<{token: string}>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state:any, action:PayloadAction<{accessToken:string,user:any}>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state:any) => {
      state.token = "";
      state.user = "";
    },
    userUpdate: (state:any,action:PayloadAction<{accessToken:string,user:string}>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userUpdateAvatar: (state:any,action:PayloadAction<{user:string}>) => {
      state.user = action.payload.user;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut, userUpdate, userUpdateAvatar, setLoading } =
  authSlice.actions;

  export default authSlice.reducer;