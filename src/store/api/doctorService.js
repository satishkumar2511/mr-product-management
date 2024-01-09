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
      invalidatesTags: ["ManageDoctor"],
    }),

    addDoctor: builder.mutation({
      query: (payload) => {
        return {
          url: "/doctor/addDoctor",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["ManageDoctor"],
    }),

    updateDoctor: builder.mutation({
      query: (payload) => {
        return {
          url: "/doctor/updateDoctor",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["ManageDoctor"],
    }),

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
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  // useDeleteUserMutation,
} = doctorService;
