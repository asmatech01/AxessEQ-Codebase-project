import axios from "axios";
import { fileDataConstant } from "./constant";

const setFileData = (fileId) => {
  return async (dispatch) => {
      const   fileData   =  fileId ;
      dispatch({
        type: fileDataConstant.GET_FILEDATA_SUCCESS,
        payload:  fileData ,
      });
  };
};

export{
    setFileData
}