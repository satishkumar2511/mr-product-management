
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useGetAllMRListQuery } from "../../../store/api/mrService";
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

function MR() {
  //const navigate = useNavigate();
  //const { t } = useTranslation();
  //const [isLoading, setIsLoading] = React.useState(false)
  const {data, isLoading} = useGetAllMRListQuery({});
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
    console.log("mrResponse");
    console.log(data);
    if(data != null)
    {
      let mrResponse = data.results.map((item) => 
      Object.assign({}, item, {id:item._id})
      );
      // for (let index = 0; index < data.results.length; index++) {
      //   doctorResponse.push(data.results[index]);
      //   doctorResponse[index]['id'] = data.results[index]._id;
      // }
      console.log("setting row data");
      console.log(mrResponse);
      setRows(mrResponse);
    }
    
    // if(mrResponse != undefined){
    // setRows(mrResponse?.results);
    // }
  }, [isLoading, data])
  //console.log(responseWithKey(mrResponse.results));
  
  
  const [rowModesModel, setRowModesModel] = React.useState({});

  // const responseWithKey = (items) => {
  //   for (let index = 0; index < items.length; index++) {
  //     items[index].key = items[index]._id
      
  //   }
  // return items;
  // }

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
    { field: "mr_first_name", headerName: "First Name", width: 180, editable: true },
    {
      field: "mr_last_name",
      headerName: "Last Name",
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
// const style = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "80vh",
//     flexDirection: "column",
//   },
// };
export default MR;
