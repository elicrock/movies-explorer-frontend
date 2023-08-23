import React from "react";
import { Routes, Route } from "react-router-dom";
import '../App/App.css';
import Main from "../Main/Main";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="*" />
      </Routes>
    </div>
  );
}

export default App;
