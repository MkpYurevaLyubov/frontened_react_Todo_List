import React, { useState } from "react";
import { Link } from "react-router-dom";
import changeIcons from "../../icons/pen.svg";
import deleteIcons from "../../icons/trash.svg";
import doneIcons from "../../icons/check.svg";
import closeIcons from "../../icons/close.svg";
import "./task.scss";

const Task = ({task, onChangeTasks}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(task.text);

  const deleteTask = async () => {
    try {
      const answer = window.confirm('Are you sure?');
      if (!answer) return;
      await fetch(`http://localhost:8000/deleteTask?id=${task._id}`, {
        method: "DELETE",
      });
      onChangeTasks();
    } catch (e) {
      onChangeTasks();
    }
  };

  const updateTask = async () => {
    try {
      await fetch("http://localhost:8000/updateTask", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(task)
      });
      setIsEdit(false);
      onChangeTasks();
    } catch (e) {
      setIsEdit(false);
    }
  };

  const onChangeCheckbox = () => {
    task.isCheck = !task.isCheck;
    updateTask();
  };

  const saveUpdateText = () => {
    task.text = value.trim();
    if (!task.text) return alert("Enter text!");
    updateTask();
  };

  return (
    <div className="box">
      <div className="task">
        <input
          checked={task.isCheck}
          type="checkbox"
          onChange={() => onChangeCheckbox()}
        />
        {!isEdit &&
          <p
            className={task.isCheck ? "decoration"  : ""}
            onDoubleClick={() => task.isCheck ? "" : setIsEdit(!isEdit)}
          >
            {task.text}
          </p>
        }
        {isEdit &&
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={"inputText"}
          />
        }
      </div>
      <div className="iconsBox">
        {!(isEdit || task.isCheck) &&
          <Link to={`/tasks/${task._id}`}>
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
            onClick={deleteTask}
          />
        }
        {isEdit &&
          <img
            src={doneIcons}
            alt="doneIcons"
            onClick={saveUpdateText}
          />
        }
        {isEdit &&
          <img
            src={closeIcons}
            alt="closeIcons"
            onClick={() => setIsEdit(!isEdit)}
          />
        }
      </div>
    </div>
  );
};

export default Task;
