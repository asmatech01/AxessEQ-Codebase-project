import {
    initialDataConstants,
    repositoryConstant,
    folderDataConstant,
    commitConstant,
    // orderConstants,
  } from "./constant";
  import axios from "../helper/axios";
  
  export const getInitialData = () => {
    return async (dispatch) => {
      const res = await axios.post(`/initialData`);
      if (res.status === 200) {
        // const  repositories  = res.data;
        // const  contents  = res.data;
        const  commits  = res.data;
        // dispatch({
        //     type: repositoryConstant.GET_REPOSITORY_SUCCESS,
        //     payload:  repositories  
        // });
        dispatch({
            type: commitConstant.GET_COMMIT_SUCCESS,
            payload:  commits  
        });
        // dispatch({
        //     type: folderDataConstant.GET_FOLDERS_SUCCESS,
        //     payload:  contents  
        // });
      }
      console.log(res);
    };
  };