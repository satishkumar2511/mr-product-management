import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useGetAllMRListQuery, useAddUpdateMRMutation } from "../../../store/api/mrService";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar 
} from "@mui/x-data-grid";
import AddEditModal from "./AddEditModal";

function MR() {
  const { data, isLoading, refetch } = useGetAllMRListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  React.useEffect(() => {
    if (data != null) {
      let mrResponse = data.results.map((item) =>
        Object.assign({}, item, { id: item._id })
      );
      setRows(mrResponse);
    }
  }, [isLoading, data]);

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

  const handleDeleteClick = (id) => () => {
    //setRows(rows.filter((row) => row.id !== id));
    alert(`are you sure you want to delete ${id}`);

    // call below functions once delete api exicuted successfully
    refetch();
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
    {
      field: "mr_first_name",
      headerName: "First Name",
      width: 180,
    },
    {
      field: "mr_last_name",
      headerName: "Last Name",
      width: 180,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "password",
      headerName: "Password",
      width: 180,
      align: "left",
      headerAlign: "left",
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
            onClick={handleDeleteClick(row._id)}
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
          Add New MR
        </Button>
      </GridToolbarContainer>
    );
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedRow(null);
  };
  const handleSave = (data) => {
    console.log("data: ", data);
    if (selectedRow) {
      // write api for update record
    } else {
      // write api for add record
      const { data, isLoading } = useAddUpdateMRMutation(data);
    }

    // call below functions once add/edit api exicuted successfully
    refetch();
    handleCloseModal();
  };
  return (
    data?.results.length > 0 && (
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
          // editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: GridToolbar,
            panel: EditToolbar
          }}
          slotProps={{
            toolbar: {showQuickFilter: true, setRows, setRowModesModel },
          }}
          // disableColumnFilter
          // disableColumnSelector
          // disableDensitySelector
        />
        
        <AddEditModal
          open={isOpenModal}
          handleClose={handleCloseModal}
          initData={selectedRow}
          handleSave={handleSave}
        />
      </Box>
    )
  );
}

export default MR;
