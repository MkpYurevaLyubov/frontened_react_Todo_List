import React, { useState } from "react";
import axios from "axios";
import "./createTask.scss";

const CreateTask = ({ onChangeTasks }) => {
  const [value, setValue] = useState('');

  const onClickBtn = async () => {
    const text = value.trim();
    if (!text) return alert("Enter task!");
    axios.post("http://localhost:8000/createTask", {
      text,
      isCheck: false,
    }).then(res => {
      setValue("");
      onChangeTasks();
    });
  };

  return (
    <div className="inputBlock">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={onClickBtn}>Add</button>
    </div>
  );
};

export default CreateTask;
