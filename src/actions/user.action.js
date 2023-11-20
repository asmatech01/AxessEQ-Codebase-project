import { authConstants, userContants } from "./constant";
import axios from "../helper/axios";
export const signup = (user) => {

    console.log(user)

    return async (dispatch) => {

        dispatch({ type: userContants.USER_REGISTER_REQUEST });
        const res = await axios.post(`/user/signup`, {
            ...user
        });

        if(res.status === 201){
            const { message } = res.data;
            dispatch({
                type: userContants.USER_REGISTER_SUCCESS,
                payload: {message}
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: userContants.USER_REGISTER_FAIL,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}