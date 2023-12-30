import { appApi } from "../appApi";

export const partyService = appApi.injectEndpoints({
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
    getAllPartyList: builder.query({
      query: () => {
        return {
          url: "/party/getPartyList",
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
  useGetAllPartyListQuery,
  // useGetUserDetailsQuery,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = partyService;
