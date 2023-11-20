import axios from "../helper/axios";
import { contributorsConstant } from "./constant"; 

const getAllContributors = (repoId) => {
    return async dispatch => {
        dispatch({ type: contributorsConstant.GET_CONTRIBUTORS_Request });
        const res = await axios.get(`/contributors/${repoId}`);
        if (res.status === 200) {
            const   contributors   = res.data;
            console.log(res.data)
            dispatch({
                type: contributorsConstant.GET_CONTRIBUTORS_SUCCESS,
                payload:  contributors  
            });
        } else {
            dispatch({
                type: contributorsConstant.GET_CONTRIBUTORS_FAILED,
                payload: { error: res.data.error }
            });
        }
    }
}

export {
    getAllContributors
}