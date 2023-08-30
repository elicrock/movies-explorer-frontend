import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import '../App/App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {

  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path="/" element={<Main />}/>
          <Route exact path="/movies" element={<Movies />}/>
          <Route exact path="/saved-movies" element={<SavedMovies />}/>
          <Route exact path="/signup" element={<Register />}/>
          <Route exact path="/signin" element={<Login />}/>
          <Route exact path="/profile" element={<Profile />}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
