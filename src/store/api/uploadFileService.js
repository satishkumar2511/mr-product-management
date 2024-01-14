import { appApi } from "../appApi";

export const uploadFileService = appApi.injectEndpoints({
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
    getAllProductList: builder.query({
      query: () => {
        return {
          url: "/product/getProductList",
          method: "GET",
        };
      },
      invalidatesTags: ["ManageMr"],
    }),

    uploadProductSales: builder.mutation({
      query: (payload) => {
        return {
          url: "/fileUpload/uploadProductSales",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["ManageUser"],
    }),

    updateProduct: builder.mutation({
      query: (payload) => {
        return {
          url: "/product/updateProduct",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["ManageUser"],
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
  //useGetAllProductListQuery,
  useUploadProductSalesMutation,
  //useUpdateProductMutation,
  // useDeleteUserMutation,
} = uploadFileService;
