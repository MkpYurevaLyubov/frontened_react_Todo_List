import React, { useState } from "react";
import axios from "axios";
import Snack from "../help/Snack";
import "./createTask.scss";

const CreateTask = ({ onChangeTasks }) => {
  const [value, setValue] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const onClickBtn = async () => {
    const text = value.trim();
    if (!text) return setSnackOpen(true);
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
      <Snack
        isOpen={snackOpen}
        handleClose={() => setSnackOpen(false)}
        text="You can't enter an empty value!"
      />
    </div>
  );
};

export default CreateTask;
