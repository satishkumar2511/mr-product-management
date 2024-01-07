import { appApi } from "../appApi";

export const mrService = appApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login Authentication
    addMR: builder.mutation({
      query: (body) => {
        return {
          url: "/mr/addMRAndCreateUser",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["ManageMr"],
    }),
    getAllMRList: builder.query({
      query: () => {
        return {
          url: "/mr/getMRList",
          method: "GET",
        };
      },
      invalidatesTags: ["ManageMr"],
    }),
    updateMR: builder.mutation({
      query: (body) => {
        return {
          url: "/mr/updateMRDetails",
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["ManageMr"],
    }),

    deleteMR: builder.mutation({
      query: (id) => {
        return {
          url: `/mr/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ManageUser"],
    }),
  }),
  //overrideExisting: false,
});

export const {
  useGetAllMRListQuery,
  useAddMRMutation,
  useUpdateMRMutation,
  useDeleteMRMutation,
  // useGetUserDetailsQuery,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = mrService;
