import { CodeFrequencyConstant } from "../actions/constant";

const initialState = {
    codeFrequency: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case CodeFrequencyConstant.GET_CODEfREQUENCY_SUCCESS:
            state = {
                ...state,
                codeFrequency: action.payload.codeFrequency
            }
            break;
    }

    return state;
}