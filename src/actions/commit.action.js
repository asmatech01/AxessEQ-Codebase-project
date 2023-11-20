import axios from "../helper/axios";
import { commitConstant } from "./constant"; 

const getAllCommits = (repoId) => {
    return async dispatch => {
        dispatch({ type: commitConstant.GET_COMMIT_Request });
        const res = await axios.get(`/api/commits/${repoId}`);
        if (res.status === 200) {
            const   commits   = res.data;
            console.log(res.data)
            dispatch({
                type: commitConstant.GET_COMMIT_SUCCESS,
                payload:  commits  
            });
        } else {
            dispatch({
                type: commitConstant.GET_COMMIT_FAILED,
                payload: { error: res.data.error }
            });
        }
    }
}

export {
    getAllCommits
}