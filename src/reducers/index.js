import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import repositoryReducer from './repository.reducer';
import foldersReducer from './folders.reducer';
import commitsReducer from './commits.reducer';
import contributorReducer from './contributor.reducer';
import codeFrequencyReducer from './codeFrequency.reducer';
import fileReducer from './file.reducer';
import recentlyReducer from './recently.reducer';
import securityReducer from './security.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    security: securityReducer,
    repository: repositoryReducer,
    recently: recentlyReducer,
    content: foldersReducer,
    fileContent: fileReducer,
    commits: commitsReducer,
    contributors: contributorReducer,
    codeFrequency: codeFrequencyReducer,
});

export default rootReducer;