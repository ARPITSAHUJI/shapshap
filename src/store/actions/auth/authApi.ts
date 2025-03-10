import { apiSlice } from "@/store/actions/api/apiSlice";
import { setTokensWithExpiry } from "../helpers/authHelpers";
import { userLoggedIn, userLoggedOut, userRegistration } from "../../slices/user/authSlice";

// Define response and request types
type RegistrationResponse = {
  message: string;
  token: string;
};

type RegistrationData = {
  email: string;
  password: string;
  name?: string;
};

type ActivationResponse = {
  accessToken: string;
  refreshToken: string;
  user: Record<string, unknown>;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  merchant: Record<string, unknown>;
};

// type SocialAuthResponse = LoginResponse;

type SendMailResponse = {
  message: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { username: string; password: string, client_id:number ,client_secret:string,grant_type:string }>({
      query: ({ username, password,client_id,client_secret,grant_type }) => ({
        url: "oauth/token",
        method: "POST",
        body: {
          username,
          password,
          client_id,
          client_secret,
          grant_type
        },
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          await setTokensWithExpiry(result.data.access_token, result.data.refresh_token, 1, 21);
          dispatch(
            userLoggedIn({
              accessToken: result.data.access_token,
              user: result.data.merchant,
            })
          );
        } catch (error: unknown) {
          console.error("Login error:", error);
        }
      },
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: "api/v1/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(_arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: unknown) {
          console.error("Logout error:", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogOutMutation
} = authApi;
