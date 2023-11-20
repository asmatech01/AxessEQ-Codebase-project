import { recentlyOpenConstant } from "../actions/constant";

const initialState = {
    recentlyOpenedRepos: [], // your data
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case recentlyOpenConstant.GET_RECENTLY_REPOSITORY_SUCCESS:
      state = {
        ...state,
        recentlyOpenedRepos: action.payload.recentlyOpenedRepos,
      };
      break;
  }

  return state;
};
