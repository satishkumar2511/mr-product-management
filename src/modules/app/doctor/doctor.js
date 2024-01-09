import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {GetLoggedInUserDetails, ShowNotification } from "../../../utils/helper";
import { useGetAllDoctorListQuery, useAddDoctorMutation, useUpdateDoctorMutation } from "../../../store/api/doctorService";
import {
  GridRowEditStopReasons,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbar,
} from "@mui/x-data-grid";
import AddEditDoctorModal from "./AddEditDoctorModal";


function Doctor() {
  const loggedInUser = JSON.parse(GetLoggedInUserDetails());
  const { data, isLoading, refetch } = useGetAllDoctorListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [addDoctor, { isLoading: isDoctorAdding }] = useAddDoctorMutation();
  const [updateDoctor, { isLoading: isDoctorUpdating }] = useUpdateDoctorMutation();
  //const [deleteDoctor, { isLoading: isDoctorDeleting }] = useDeletePartyMutation();

  //const {data, isLoading} = useGetAllPartyListQuery({});
  const [rows, setRows] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  console.log("with start doctor isLoading");
  console.log(isLoading);

  React.useEffect(() => {
    if (data != null) {
      let doctorResponse = data.results.map((item) =>
        Object.assign({}, item, { id: item._id })
      );
      setRows(doctorResponse);
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
         let res = await updateDoctor(reqData); 
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
       const data = await addDoctor(reqData);
       console.log("add Doctor data: ");
       console.log(data);
       if(data.data.message != null)
         {
          ShowNotification(data.data.message, 'warning')
         }
         else{
          ShowNotification("Doctor Created successfully", 'success')
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
   //console.group("delete Doctor called")
    try {
      //await deleteDocotr(id);
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
    { field: "_id", headerName: "Id", width: 180, editable: true },
    {
      field: "doctor_name",
      headerName: "Doctor Name",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    { field: "mr_id", headerName: "MR Id", width: 180, editable: true },
    {
      field: "pts_ptr",
      headerName: "PTR / PTS",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "pre_post",
      headerName: "PRE / POST",
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
          Add New Doctor
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
      <AddEditDoctorModal
          open={isOpenModal}
          handleClose={handleCloseModal}
          initData={selectedRow}
          handleSave={handleSave}
        />
    </Box>
  );
}

export default Doctor;
