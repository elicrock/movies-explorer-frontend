import React from "react";
import { Routes, Route } from "react-router-dom";
import '../App/App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route exact path="/" element={<Main />}/>
        <Route exact path="/movies" element={<Movies />}/>
        <Route exact path="/saved-movies" element={<SavedMovies />}/>
        <Route exact path="/signup" element={<Register />}/>
        <Route exact path="/signin" element={<Login />}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
