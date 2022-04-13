import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Snack from "../help/Snack";
import ResponsiveDialog from "../help/Dialog";
import TextareaAutosize from "react-textarea-autosize";
import changeIcons from "../../icons/pen.svg";
import deleteIcons from "../../icons/trash.svg";
import doneIcons from "../../icons/check.svg";
import closeIcons from "../../icons/close.svg";
import "./task.scss";

const Task = ({task, onChangeTasks}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState(task.text);
  const { _id, text, isCheck } = task;

  const deleteTask = async () => {
    axios.delete(`http://localhost:8000/deleteTask?id=${task._id}`)
      .then(() => {
        onChangeTasks();
      });
  };

  const updateTask = async () => {
    axios.patch("http://localhost:8000/updateTask", task)
      .then(() => {
        setIsEdit(false);
        onChangeTasks();
      });
  };

  const onChangeCheckbox = () => {
    task.isCheck = !task.isCheck;
    updateTask();
  };

  const saveUpdateText = () => {
    const text = value.trim();
    if (!text) return setSnackOpen(true);
    task.text = text;
    updateTask();
  };

  return (
    <>
      <div className="box">
        <div className="task">
          <input
            checked={isCheck}
            type="checkbox"
            onChange={() => onChangeCheckbox()}
          />
          {!isEdit &&
            <p
              className={isCheck ? "decoration" : ""}
              onDoubleClick={() => !isCheck && setIsEdit(!isEdit)}
            >
              {text}
            </p>
          }
          {isEdit &&
            <TextareaAutosize
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="textArea"
            />
          }
        </div>
        <div className="iconsBox">
          {!(isEdit || isCheck) &&
            <Link to={`/tasks/${_id}`}>
              <img
                src={changeIcons}
                alt="changeIcon"
              />
            </Link>
          }
          {!isEdit &&
            <img
              src={deleteIcons}
              alt="deleteIcon"
              onClick={() => setDialogOpen(true)}
            />
          }
          {isEdit &&
            <>
              <img
                src={doneIcons}
                alt="doneIcons"
                onClick={saveUpdateText}
              />
              <img
                src={closeIcons}
                alt="closeIcons"
                onClick={() => setIsEdit(!isEdit)}
              />
            </>
          }
        </div>
        <Snack
          isOpen={snackOpen}
          handleClose={() => setSnackOpen(false)}
          text="You can't enter an empty value!"
        />
      </div>
      <ResponsiveDialog
        isOpen={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        text="Are you sure you want to delete the task?"
        onClickYes={deleteTask}
      />
    </>
  );
};

export default Task;
