import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {GetLoggedInUserDetails, ShowNotification } from "../../../utils/helper";
import { useGetAllProductListQuery, useAddProductMutation, useUpdateProductMutation } from "../../../store/api/productService";
import {
  GridRowEditStopReasons,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbar,
} from "@mui/x-data-grid";
import AddEditProductModal from "./AddEditProductModal";

function Product() {
  const loggedInUser = JSON.parse(GetLoggedInUserDetails());
  const { data, isLoading, refetch } = useGetAllProductListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [addProduct, { isLoading: isProductAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isProductUpdating }] = useUpdateProductMutation();
  //const [deleteParty, { isLoading: isPartyDeleting }] = useDeletePartyMutation();

  const [rows, setRows] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  console.log("with start isLoading");
  console.log(isLoading);

  React.useEffect(() => {
    if (data != null) {
      let productResponse = data.results.map((item) =>
        Object.assign({}, item, { id: item._id })
      );
      setRows(productResponse);
    }
  }, [isLoading, data]);
  
  
  
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (row) => () => {
    setSelectedRow(row);
    setIsOpenModal(true);
    //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleAddClick = () => () => {
    setSelectedRow(null);
    setIsOpenModal(true);
    //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedRow(null);
  };
  const handleSave = async (reqData) => {
    console.log("loggedInUser from Party");
    //console.log(JSON.parse(loggedInUser)._id);
    reqData.loggedInUserId = loggedInUser._id;
    console.log("data: ");
    console.log(reqData);
    if (selectedRow) {
      // write api for update record
      try {
        console.log("data from upate")
        console.log(reqData);
         let res = await updateProduct(reqData); 
         if(res?.Success == false)
         {
          ShowNotification(res.message, 'warning')
         }
        refetch();
        handleCloseModal();
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      // write api for add record
      try {
       const data = await addProduct(reqData);
       console.log("add product data: ");
       console.log(data);
       if(data != null)
         {
          ShowNotification(data.data.message, 'warning')
         }
         else{
          ShowNotification("Product Created successfully", 'success')
         }
       console.log('res: ', data);
        refetch();
        handleCloseModal();
      } catch (error) {
        console.log("error: ", error);
      }
    }

    // call below functions once add/edit api exicuted successfully
  };
  const handleDeleteClick = async (id) => {
    //setRows(rows.filter((row) => row.id !== id));
    //alert(`are you sure you want to delete ${id}`);
   //console.group("delete product called")
    try {
      //await deleteParty(id);
      //refetch();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "_id", headerName: "Product Id", width: 180, editable: true },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "product_des",
      headerName: "Product Description",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "pts",
      headerName: "PTS",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "ptr",
      headerName: "PTR",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
          key={row._id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
          key={row._id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const EditToolbar = (props) => {
    // const { setRows, setRowModesModel } = props;
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsOpenModal(true)}
        >
          Add New Product
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    data?.results.length > 0 &&
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        //editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: GridToolbar,
          panel: EditToolbar,
        }}
        slotProps={{
          toolbar: { showQuickFilter: true, setRows, setRowModesModel },
        }}
        
      />
      <AddEditProductModal
          open={isOpenModal}
          handleClose={handleCloseModal}
          initData={selectedRow}
          handleSave={handleSave}
        />
    </Box>
  );
}

export default Product;
