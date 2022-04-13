import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Tasks from "./component/tasks";
import EditTask from "./component/editTasks";
import "./App.css";

const App = () => {
  return (
    <div className="main">
      <h1>To-do list</h1>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<EditTask />} />
        <Route path="/" element={<Navigate replace to="/tasks" />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </div>
  );
};

export default App;
