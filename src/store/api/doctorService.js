import { appApi } from "../appApi";

export const doctorService = appApi.injectEndpoints({
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
    getAllDoctorList: builder.query({
      query: () => {
        return {
          url: "/doctor/getDoctorList",
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
  useGetAllDoctorListQuery,
  // useGetUserDetailsQuery,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = doctorService;
