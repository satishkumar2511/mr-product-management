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
      invalidatesTags: ["ManageParty"],
    }),

    addParty: builder.mutation({
      query: (payload) => {
        return {
          url: "/party/addParty",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["ManageParty"],
    }),

    updateParty: builder.mutation({
      query: (payload) => {
        return {
          url: "/party/updatePartyDetails",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["ManageParty"],
    }),

    deleteParty: builder.mutation({
      query: () => {
        return {
          url: "/party/deleteParty",
          method: "DELETE",
        };
      },
      invalidatesTags: ["ManageParty"],
    }),
  }),
  //overrideExisting: false,
});

export const {
  useGetAllPartyListQuery,
  useAddPartyMutation,
  useUpdatePartyMutation,
  //useDeletePartyMutation,
} = partyService;
