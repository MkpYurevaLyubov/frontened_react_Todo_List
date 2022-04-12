import React, { useState } from "react";
import "./createTask.scss";

const CreateTask = ({ onChangeTasks }) => {
  const [value, setValue] = useState('');

  const onClickBtn = async () => {
    try {
      const text = value.trim();
      if (!text) return alert("Enter task!");
      await fetch("http://localhost:8000/createTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          text,
          isCheck: false,
        })
      });
      setValue("");
      onChangeTasks();
    } catch (e) {
      onChangeTasks();
    }
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
