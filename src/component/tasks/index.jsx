import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "../createTask";
import TasksContainer from "../tasksContainer";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isChange, setIsChange] = useState(true);

  useEffect(() => {
    if (isChange) fetchData();
  }, [isChange]);

  const fetchData = () => {
    axios.get("http://localhost:8000/allTasks")
      .then(res => {
        res = res.data.sort((a, b) => a.isCheck === b.isCheck ? 0 : a.isCheck ? 1 : -1);
        setTasks(res);
        setIsChange(false);
      });
  };

  const onChangeTasks = () => {
    setIsChange(true);
  };

  return (
    <>
      <CreateTask onChangeTasks={onChangeTasks} />
      <TasksContainer tasks={tasks} onChangeTasks={onChangeTasks} />
    </>
  );
};

export default Tasks;
