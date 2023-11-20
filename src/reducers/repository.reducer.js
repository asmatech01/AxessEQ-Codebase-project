import { repositoryConstant } from "../actions/constant";

const initialState = {
  repositories: [], // your data
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case repositoryConstant.GET_REPOSITORY_SUCCESS:
      state = {
        ...state,
        repositories: action.payload.repositories,
      };
      break;
    case repositoryConstant.ADD_REPOSITORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case repositoryConstant.ADD_REPOSITORY_SUCCESS:
      state = {
        ...state,
      };
      break;
  }

  return state;
};
