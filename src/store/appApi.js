import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetToken } from "../utils/helper";
import { BASE_URL } from "../utils/config";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    headers.set("accept", "application/json");
    // headers.set('Content-Type', 'application/json')
    headers.set("Access-Control-Allow-Origin", "*");
    // headers.set('app-code', 'en')
    // headers.set('lang-code', 'en')

    const userToken = GetToken();

    if (userToken) {
      headers.set("Authorization", `Bearer ${userToken}`);
    }
    return headers;
  },
});

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: baseQuery,
  tagTypes: ["UserAuth"],
  endpoints: () => ({}),
});
