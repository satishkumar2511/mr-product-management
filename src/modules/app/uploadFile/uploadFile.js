import { useState } from "react";
import * as XLSX from 'xlsx';
import './uploadFile.css';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {GetLoggedInUserDetails, ShowNotification } from "../../../utils/helper";
import { useUploadProductSalesMutation } from "../../../store/api/uploadFileService";

export const style = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    // border: "2px solid #000",
    boxShadow: 24,
  },
  header: {
    display: "flex",
    height: 50,
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    p: 4,
    "& h2": {
      fontWeight: "bold",
    },
  },
  body: {
    p: 3,
    // padding: "10px 0px ",
  },
  inputField: {
    mb: 2,
  },
  footer: {
    p: 3,
    pt: 0,
    float: "right",
  },
};

function UploadFile() {
  const loggedInUser = JSON.parse(GetLoggedInUserDetails());
  const [addProductSalesData, { isLoading: isAddProductSalesData }] = useUploadProductSalesMutation();
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile=(e)=>{
    
    let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFile(e.target.result);
        }
      }
      else{
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('Please select your file');
    }
  }
  
  // submit event
  const handleFileSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type: 'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const modifiedData = [];
      let partyName = '';
      console.log("Excel data")
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        if(data[index]["__EMPTY"] != null){
          break;
        }
        if(data[index]["Free"] === undefined)
        {
          console.log("partyname =  " +data[index]["Product"])
          partyName = data[index]["Product"].trim();
        }
        else if(data[index]["Product"] === "Party Total:") {
        console.log("party total line skiped for party name = "+ partyName);
        }
        else{
          modifiedData.push({"Party":partyName, "Product": data[index]["Product"].trim(), "Free" : data[index]["Free"],
          "SaleQty" : data[index]["SaleQty."],"Amount" : data[index]["Amount"]})
        }
        
      } 
      console.log("modifiedData Excel data")
      console.log(modifiedData)
      setExcelData(modifiedData.slice(0,100));
    }
  }

  const handleSave = async () => {
    console.log("loggedInUser from Admin");
    //console.log(JSON.parse(loggedInUser)._id);
    let reqData = {"loggedInUserId" : loggedInUser._id, "data" :excelData};
    // reqData.loggedInUserId = loggedInUser._id;
    // reqData.data = excelData;
    console.log("data to post : ");
    console.log(reqData);
    try {
      const data = await addProductSalesData(reqData);
      console.log("add product sales data: ");
      console.log(data);
      if(data != null)
        {
         ShowNotification(data.data.message, 'warning')
        }
        else{
         ShowNotification("Product Created successfully", 'success')
        }
      console.log('res: ', data);
       //refetch();
       //handleCloseModal();
     } catch (error) {
       console.log("error: ", error);
     }

    // call below functions once add/edit api exicuted successfully
  };

  return (
    <div className="wrapper">

      <h3>Upload & View Excel Sheets</h3>

      {/* form */}
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile} />
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
        {typeError&&(
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* view data */}
      <div className="viewer">
        {excelData?(
          <div className="table-responsive">
            <table className="table">

              <thead>
                <tr>
                  {Object.keys(excelData[2]).map((key)=>(
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index)=>(
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key)=>(
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ):(
          <div>No File is uploaded yet!</div>
        )}
      </div>
      <Box sx={style.footer}>
          <Button variant="text" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleSave()}>
            save
          </Button>
        </Box>
    </div>
  );
}

export default UploadFile;
