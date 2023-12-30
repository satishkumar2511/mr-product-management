import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useGetAllDoctorListQuery } from "../../../store/api/doctorService";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomId,
} from "@mui/x-data-grid-generator";


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add New MR
      </Button>
    </GridToolbarContainer>
  );
}

function Doctor() {
  const {data, isLoading} = useGetAllDoctorListQuery({});
  const [rows, setRows] = React.useState([]);
  //const mrResponse =  useGetAllMRListQuery({});
  // const getMRListData = async () => {
   
  // }
  console.log("with start isLoading");
  console.log(isLoading);

  React.useEffect(() => {
    //setIsLoading(true);
    
    console.log("with end isLoading");
    console.log(isLoading);
    //setIsLoading(false);
    console.log("doctorResponse");
    console.log(data);
    if(data != null)
    {
      let doctorResponse = data.results.map((item) => 
      Object.assign({}, item, {id:item._id})
      );
      // for (let index = 0; index < data.results.length; index++) {
      //   doctorResponse.push(data.results[index]);
      //   doctorResponse[index]['id'] = data.results[index]._id;
      // }
      console.log("setting row data");
      console.log(doctorResponse);
      setRows(doctorResponse);
    }
    
  
  }, [isLoading, data])
  
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
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
    { field: "doctor_id", headerName: "Doctor Id", width: 180, editable: true },
    {
      field: "doctor_name",
      headerName: "Doctor Name",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
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
      getActions: ({ _id }) => {
        const isInEditMode = rowModesModel[_id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
            key={_id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(_id)}
            />,
            <GridActionsCellItem
            key={_id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(_id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
          key={_id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(_id)}
            color="inherit"
          />,
          <GridActionsCellItem
          key={_id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(_id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        
      />
    </Box>
  );
}

export default Doctor;
