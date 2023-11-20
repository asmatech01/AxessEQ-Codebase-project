import axios from "../helper/axios";
import { folderDataConstant } from "./constant";
import Swal from "sweetalert2";
const getAllFolders = () => {
  return async (dispatch) => {
    dispatch({ type: folderDataConstant.GET_FOLDERS_Request });
    const res = await axios.get(`/hierarchy`);
    if (res.status === 200) {
      const contents = res.data;
      dispatch({
        type: folderDataConstant.GET_FOLDERS_SUCCESS,
        payload: contents,
      });
    } else {
      dispatch({
        type: folderDataConstant.GET_FOLDERS_FAILED,
        payload: { error: res.data.error },
      });
    }
  };
};

// export const uploadFolder = (repoId, formData) => {
//   return async (dispatch) => {
//     console.log("here is repositoryId", repoId)
//     dispatch({ type: folderDataConstant.ADD_FOLDERS_Request });
//     const response = await axios.post(
//       `/upload/${repoId}`,
//       formData, {
//           onUploadProgress : (data) => {
//             console.log("here is data", data.loaded, data.total);
//             console.log("here aadad", (data.loaded/data.total) * 100);
//           }
//       },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     if (response.status === 200) {
//       dispatch({ type: folderDataConstant.ADD_FOLDERS_SUCCESS });
//       dispatch(getAllFolders());
//     } else {
//       dispatch({ type: folderDataConstant.ADD_FOLDERS_FAILED });
//     }
//   };
// };




export const uploadFolder = (repoId, formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: folderDataConstant.ADD_FOLDERS_Request });

      const response = await axios.post(`/upload/${repoId}`, formData, {
        onUploadProgress: (data) => {
          const progress = (data.loaded / data.total) * 100;
          // Update the upload progress in the Redux store
          dispatch({ type: folderDataConstant.UPDATE_UPLOAD_PROGRESS, payload: progress });
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        dispatch({ type: folderDataConstant.ADD_FOLDERS_SUCCESS });
        dispatch(getAllFolders());
      } else {
        dispatch({ type: folderDataConstant.ADD_FOLDERS_FAILED, payload: "Upload failed" });
      }
    } catch (error) {
      // Handle and dispatch an error action
      dispatch({ type: folderDataConstant.ADD_FOLDERS_FAILED, payload: error.message });
    }
  };
};

export const deletefolder = (repoId) => {
  return async (dispatch) => {
    dispatch({ type: folderDataConstant.DELETE_FOLDERS_Request });

    try {
      const response = await axios.delete(
        `/repositories/${repoId}/content`
        // `/hierarchy/${repoId}`
      );

      if (response.status === 200) {
        // Display a success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Content deleted successfully.",
        });

        dispatch({ type: folderDataConstant.DELETE_FOLDERS_SUCCESS });
        dispatch(getAllFolders()); // Optionally, you can dispatch another action here.
      } else {
        // Display an error alert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete Content.",
        });

        dispatch({ type: folderDataConstant.DELETE_FOLDERS_FAILED });
      }
    } catch (error) {
      // Handle any errors, e.g., network issues, here
      console.error(error);
      dispatch({ type: folderDataConstant.DELETE_FOLDERS_FAILED });
    }
  };
};

export { getAllFolders };
