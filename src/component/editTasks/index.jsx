import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "./editTasks.scss";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  
  useEffect(() => {
    fetchData(id);
  }, [id]);
  
  const fetchData = async (id) => {
    try {
      let res = await fetch(`http://localhost:8000/findTask?id=${id}`, {
        method: "GET"
      });
      res = await res.json();
      if (res[0].isCheck) return navigate("/tasks");
      setTask(res[0]);
    } catch (e) {
      navigate("/tasks");
      alert('A task not found');
    }
  }

  const onChangeText = (e) => {
    setTask({
      ...task,
      text: e.target.value || ""
    });
  }

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
      navigate("/tasks");
    } catch (e) {
      navigate("/tasks");
    }
  };

  return (
    <>
      {task && (
        <div className="editingContainer">
          <TextareaAutosize
            className="textarea"
            value={task.text || ""}
            onChange={(e) => onChangeText(e)}
          />
          <div className="btnContainer">
            <button onClick={updateTask}>Change</button>
            <Link to={"/tasks"}>Close</Link>
          </div>
        </div>
        )
      }
    </>
  );
};

export default EditTask;
