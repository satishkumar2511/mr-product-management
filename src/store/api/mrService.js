import { appApi } from "../appApi";

export const mrService = appApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login Authentication
    // getAllMR: builder.mutation({
    //   query: (body) => {
    //     return {
    //       url: "/mr/getMRList",
    //       method: "POST",
    //       body: body,
    //     };
    //   },
    //   invalidatesTags: ["UserAuth"],
    // }),
    getAllMRList: builder.query({
      query: () => {
        return {
          url: "/mr/getMRList",
          method: "GET",
        };
      },
      invalidatesTags: ["ManageMr"],
    }),

    // updateUser: builder.mutation({
    //   query: (payload) => {
    //     return {
    //       url: "/users/me",
    //       method: "PUT",
    //       body: payload,
    //     };
    //   },
    //   invalidatesTags: ["ManageUser"],
    // }),

    // deleteUser: builder.mutation({
    //   query: () => {
    //     return {
    //       url: "/users/me",
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["ManageUser"],
    // }),
  }),
  //overrideExisting: false,
});

export const {
  useGetAllMRListQuery,
  // useGetUserDetailsQuery,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = mrService;
