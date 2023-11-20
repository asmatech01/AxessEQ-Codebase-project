import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Repo from "./components/Repo"; // Make sure the path is correct
import RepoFiles from "./components/RepoFiles"; // Make sure the path is correct
import FileContentPage from "./components/FileContentPage";
import CreateRepo from "./components/CreateRepo";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HeroSection from "./pages/HeroSection";
import Percentage from "./components/Percentage";
import Commit from "./components/Commit";
import Security from "./components/Security";
import ForgotPassword from "./components/ForgetPassword";
import Collaborator from "./components/Collaborators";
import AllCollaborators from "./components/AllCollaborators";
import ContributorChart from "./components/ContributorChart";
import CodeFrequency from "./components/CodeFrequency";
import AllCodeFrequency from "./components/AllCodeFrequency";
import Signup from "./components/Register";
import Signin from "./components/Signin";
import { useSelector, useDispatch } from "react-redux";
import { getInitialData } from "./actions/initialData.action";
import { getAllRecentlyRepository, getAllRepository } from './actions/repository.action'
import { isUserLoggedIn } from './actions/auth.action'
import { getAllFolders } from "./actions/folders.action";


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  // console.log("here is authencitnate", auth.authenticate)
  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
      dispatch(getAllFolders());
      dispatch(getAllRepository());
      dispatch(getAllRecentlyRepository());
    }
    
  }, [auth.authenticate]);


  return (
    
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Signin />} />
          {/* <Route path="/signin" element={<Signin />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chart" element={<Percentage />} />
          <Route path="/createRepo" element={<CreateRepo />} />
          <Route path="/repos" element={<Repo />} />
          <Route path="/repos/:repoId" element={<RepoFiles />} />
          <Route path="/content/:repoId" element={<FileContentPage />} />
          <Route path="/commits/:repoId" element={<Commit />} />
          <Route path="/collaborators/:repoId" element={<Collaborator />} />
          <Route path="/contributors/:repoId" element={<ContributorChart />} />
          <Route path="/code-frequency/:repoId" element={<CodeFrequency />} />
          <Route path="/code-frequency" element={<AllCodeFrequency />} />
          <Route path="/collaborators" element={<AllCollaborators />} />
          <Route path="/security" element={<Security />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          {/* <Route path="/repos/:repoId/:dir/:fileName" element={<FolderContentPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;