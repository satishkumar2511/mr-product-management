import { appApi } from "../appApi";

export const userAuth = appApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login Authentication
    loginWithEmail: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/phone",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["UserAuth"],
    }),
    getUserDetails: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      invalidatesTags: ["ManageUser"],
    }),

    updateUser: builder.mutation({
      query: (payload) => {
        return {
          url: "/users/me",
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["ManageUser"],
    }),

    deleteUser: builder.mutation({
      query: () => {
        return {
          url: "/users/me",
          method: "DELETE",
        };
      },
      invalidatesTags: ["ManageUser"],
    }),
  }),
  //overrideExisting: false,
});

export const {
  useLoginWithEmailMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userAuth;
