import { securityConstant } from "../actions/constant";

const initialState = {
  securityQuestion: [], // your data
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case securityConstant.GET_SECURITY_QUESTION_SUCCESS:
      state = {
        ...state,
        securityQuestion: action.payload.securityQuestion,
      };
      break;
    // case repositoryConstant.ADD_REPOSITORY_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case repositoryConstant.ADD_REPOSITORY_SUCCESS:
    //   state = {
    //     ...state,
    //   };
    //   break;
  }

  return state;
};
