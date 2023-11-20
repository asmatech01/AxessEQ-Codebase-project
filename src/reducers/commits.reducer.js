import { commitConstant } from "../actions/constant";

const initialState = {
    commits: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case commitConstant.GET_COMMIT_SUCCESS:
            state = {
                ...state,
                commits: action.payload.commits
            }
            break;
    }

    return state;
}