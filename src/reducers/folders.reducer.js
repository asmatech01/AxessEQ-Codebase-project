// import { folderDataConstant } from "../actions/constant";

// const initialState = {
//     contents: []
// };

// export default (state = initialState, action) => {
//     switch(action.type){
//         case folderDataConstant.GET_FOLDERS_SUCCESS:
//             state = {
//                 ...state,
//                 contents: action.payload.contents
//             }
//             break;
//     }

//     return state;
// }

import { folderDataConstant } from "../actions/constant";

const initialState = {
  contents: [],
  loading: false,
  uploading: false, // Indicates whether an upload is in progress
  uploaded: false, // Indicates if the upload was successful
  error: null, // Holds any error message in case of failure
  progress: 0, // Add progress field in the initial state
};

export default (state = initialState, action) => {
  switch (action.type) {
    case folderDataConstant.GET_FOLDERS_Request:
      return {
        ...state,
        loading: true,
        uploaded: false,
      };
    case folderDataConstant.GET_FOLDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        contents: action.payload.contents,
      };
    case folderDataConstant.GET_FOLDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: "Failed to fetch folders",
      };

    case folderDataConstant.ADD_FOLDERS_Request:
      return {
        ...state,
        uploading: true,
        uploaded: false,
        error: null,
      };
    case folderDataConstant.UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload, // Update the progress value in the state
      };
    case folderDataConstant.ADD_FOLDERS_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true,
        error: null,
      };

    case folderDataConstant.ADD_FOLDERS_FAILED:
      return {
        ...state,
        uploading: false,
        uploaded: false,
        error: "Upload failed",
      };

    default:
      return state;
  }
};
