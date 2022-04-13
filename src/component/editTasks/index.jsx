import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import "./editTasks.scss";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const { text } = task;

  useEffect(() => {
    fetchData(id);
  }, [id]);
  
  const fetchData = async (id) => {
    axios.get(`http://localhost:8000/findTask?id=${id}`)
      .then(res => {
        const result = res.data[0];
        if (result.isCheck) return navigate("/tasks");
        setTask(result);
      })
      .catch(() => {
        navigate("/tasks");
        alert('A task not found');
      });
  }

  const onChangeText = (e) => {
    setTask({
      ...task,
      text: e.target.value || ""
    });
  }

  const updateTask = async () => {
    axios.patch("http://localhost:8000/updateTask", task)
      .then(() => {
        navigate("/tasks")
      });
  };

  return (
    <>
      {task && (
        <div className="editingContainer">
          <TextareaAutosize
            className="textarea"
            value={text || ""}
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
