import { contributorsConstant } from "../actions/constant";

const initialState = {
    contributors: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case contributorsConstant.GET_CONTRIBUTORS_SUCCESS:
            state = {
                ...state,
                contributors: action.payload.contributors
            }
            break;
    }

    return state;
}