import React from "react";
import { Routes, Route } from "react-router-dom";
import '../App/App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="/movies" element={<Movies/>}/>
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
