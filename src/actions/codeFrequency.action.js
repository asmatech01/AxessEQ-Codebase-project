import axios from "../helper/axios";

import { CodeFrequencyConstant } from "./constant"; 

const getAllCodeFrequency = (repoId) => {
    return async dispatch => {
        dispatch({ type: CodeFrequencyConstant.GET_CODEfREQUENCY_Request });
        const res = await axios.get(`/api/code-frequency/${repoId}`);
        if (res.status === 200) {
            const   codeFrequency   = res.data;
            console.log(res.data)
            dispatch({
                type: CodeFrequencyConstant.GET_CODEfREQUENCY_SUCCESS,
                payload:  codeFrequency  
            });
        } else {
            dispatch({
                type: CodeFrequencyConstant.GET_CODEfREQUENCY_FAILED,
                payload: { error: res.data.error }
            });
        }
    }
}

export {
    getAllCodeFrequency
}