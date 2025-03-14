import { RootState } from "@/hooks";
import { storage } from "@/utils";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { router } from "expo-router";
import { setToken } from "../slices/authSlice";
import type {
  SignInResponseType,
  SignUpResponseType,
  SignInType,
  SignUpType,
  UploadMusicResponseType,
  UploadMusicType,
} from "./types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    if (token !== "") headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (arg, api, extra) => {
  let result = await baseQuery(arg, api, extra);

  if (result.error) {
    const errorResponse: any = result.error?.data;
    const errorToken: boolean =
      errorResponse.message == "authentication invalid" ||
      errorResponse.message == "jwt malformed" ||
      errorResponse.message == "jwt expired";

    if (errorToken) {
      const credential = storage.getString("credential");

      const response = await baseQuery(
        {
          url: "/auth/login",
          method: "POST",
          body: JSON.parse(credential ?? ""),
        },
        api,
        extra
      );
      if (response.data) {
        api.dispatch(setToken((response.data as any).user.token));
        result = await baseQuery(arg, api, extra);
      } else {
        router.canDismiss() && router.dismissAll();
        router.replace("/auth");
      }
    }
  }

  return result;
};

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: baseQueryReauth,
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponseType, SignInType>({
      query: (arg) => ({
        url: "/auth/login",
        method: "POST",
        body: arg.credential,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;

          dispatch(setToken(response.data.token));

          arg.remember_me &&
            storage.set("credential", JSON.stringify(arg.credential));

          router.replace("/(tabs)");
        } catch (error: any) {
          if (error.error) alert(error.error.data.message);
          else alert(`Something went wrong: ${error.message}`);
        }
      },
    }),
    signUp: builder.mutation<SignUpResponseType, SignUpType>({
      query: (arg) => ({
        url: "/auth/register",
        method: "POST",
        body: arg.credential,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          arg.remember_me &&
            storage.set(
              "credential",
              JSON.stringify({
                email: arg.credential.email,
                password: arg.credential.password,
              })
            );

          router.dismissAll();
          router.dismissTo("/(tabs)");
        } catch (error: any) {
          if (error.error) alert(error.error.data.message);
          else alert(`Something went wrong: ${error.message}`);
        }
      },
    }),
    uploadMusic: builder.mutation<UploadMusicResponseType, UploadMusicType>({
      query: (body) => ({
        url: "/music",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useUploadMusicMutation } =
  apiService;
