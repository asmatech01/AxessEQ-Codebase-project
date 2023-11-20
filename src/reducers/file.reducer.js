import { fileDataConstant } from "../actions/constant";

const initialState = {
    fileData: {}
};

export default (state = initialState, action) => {
    switch(action.type){
        case fileDataConstant.GET_FILEDATA_SUCCESS:
            state = {
                ...state,
                fileData: action.payload
            }
            break;
    }

    return state;
}