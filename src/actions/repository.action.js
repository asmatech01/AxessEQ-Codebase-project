import axios from "../helper/axios";
import { repositoryConstant, recentlyOpenConstant } from "./constant";
import Swal from "sweetalert2";

const getAllRepository = () => {
  return async (dispatch) => {
    dispatch({ type: repositoryConstant.GET_REPOSITORY_REQUEST });
    const res = await axios.get(`/api/get-repositories`);
    if (res.status === 200) {
      const repositories = res.data;
      dispatch({
        type: repositoryConstant.GET_REPOSITORY_SUCCESS,
        payload: repositories,
      });
    } else {
      dispatch({
        type: repositoryConstant.GET_REPOSITORY_FAILED,
        payload: { error: res.data.error },
      });
    }
  };
};
const getAllRecentlyRepository = () => {
  return async (dispatch) => {
    dispatch({ type: recentlyOpenConstant.GET_RECENTLY_REPOSITORY_REQUEST });
    const res = await axios.get(`/api/get-recently-repos`);
    console.log( "here is recently",res.data)
    if (res.status === 200) {
      const recentlyOpenedRepos = res.data;
      dispatch({
        type: recentlyOpenConstant.GET_RECENTLY_REPOSITORY_SUCCESS,
        payload: recentlyOpenedRepos,
      });
    } else {
      dispatch({
        type: recentlyOpenConstant.GET_RECENTLY_REPOSITORY_FAILED,
        payload: { error: res.data.error },
      });
    }
  };
};

export const createRepo = (repoName, description) => {
  return async (dispatch) => {
    dispatch({ type: repositoryConstant.ADD_REPOSITORY_REQUEST });
    // console.log("hereis", form)
    try {
    const response = await axios.post(
      `/api/create-repository`,
      {
        name: repoName,
        description: description,
      }
    );

    if (response.status === 200) {
        // Display a success alert
        Swal.fire({
        icon: "success",
        title: "Success",
        text: "Repository Created Successfully.",
    });
    
    dispatch({ type: repositoryConstant.ADD_REPOSITORY_SUCCESS });
    dispatch(getAllRepository());
      // Optionally, you can dispatch another action here.
    } else {
      // Display an error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Create Repository.",
      });

      dispatch({ type: repositoryConstant.ADD_REPOSITORY_FAILED });
    }
    } catch (error) {
      // Handle any errors, e.g., network issues, here
      console.error(error);
      dispatch({ type: repositoryConstant.ADD_REPOSITORY_FAILED });
    }
  };
};
export const DeleteContent = (repoId) => {
  return async (dispatch) => {
    dispatch({ type: repositoryConstant.DELETE_REPOSITORY_REQUEST });

    try {
      const response = await axios.delete(
        `/api/repository/${repoId}`
      );

      if (response.status === 200) {
        // Display a success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Repository deleted successfully.",
        });

        dispatch({ type: repositoryConstant.DELETE_REPOSITORY_SUCCESS });
        dispatch(getAllRepository()); // Optionally, you can dispatch another action here.
      } else {
        // Display an error alert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete repository.",
        });

        dispatch({ type: repositoryConstant.DELETE_REPOSITORY_FAILED });
      }
    } catch (error) {
      // Handle any errors, e.g., network issues, here
      console.error(error);
      dispatch({ type: repositoryConstant.DELETE_REPOSITORY_FAILED });
    }
  };
};
export const recentlyOpen = (repoId) => {
  return async (dispatch) => {
    dispatch({ type: recentlyOpenConstant.UPDATE_RECENTLY_REPOSITORY_REQUEST });

    try {
      const response = await axios.post(
        `/api/recently/${repoId}`
      );

      if (response.status === 200) {
        dispatch({ type: recentlyOpenConstant.UPDATE_RECENTLY_REPOSITORY_SUCCESS });
        dispatch(getAllRecentlyRepository()); // Optionally, you can dispatch another action here.
      } else {
        dispatch({ type: recentlyOpenConstant.UPDATE_RECENTLY_REPOSITORY_FAILED });
      }
    } catch (error) {
      // Handle any errors, e.g., network issues, here
      console.error(error);
      dispatch({ type: recentlyOpenConstant.UPDATE_RECENTLY_REPOSITORY_FAILED });
    }
  };
};

export { getAllRepository, getAllRecentlyRepository };
