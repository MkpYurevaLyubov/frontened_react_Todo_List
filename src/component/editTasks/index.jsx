import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import Snack from "../help/Snack";
import "./editTasks.scss";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
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
        setNotFound(true);
        setTimeout(() => {
          navigate("/tasks");
        }, 3000);
      });
  }

  const onChangeText = (e) => {
    setTask({
      ...task,
      text: e.target.value || ""
    });
  }

  const updateTask = async () => {
    if (!text) return setSnackOpen(true);
    axios.patch("http://localhost:8000/updateTask", task)
      .then(() => {
        navigate("/tasks")
      });
  };

  return task && (
    <div className="editingContainer">
      {!notFound && (
        <>
          <TextareaAutosize
            className="textarea"
            value={text || ""}
            onChange={(e) => onChangeText(e)}
          />
          <div className="btnContainer">
            <button onClick={updateTask}>Change</button>
            <Link to={"/tasks"}>Close</Link>
          </div>
        </>
      )}
      {notFound && (
        <div className="notFound">
          <p>Task not found</p>
          <p>Redirect to main page</p>
          <div className="loader-2"></div>
        </div>
      )}
      <Snack
        isOpen={snackOpen}
        handleClose={() => setSnackOpen(false)}
        text="You can't enter an empty value!"
      />
    </div>
  );
};

export default EditTask;
