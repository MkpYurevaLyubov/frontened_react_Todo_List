import React, { useEffect, useState } from "react";
import CreateTask from "../createTask";
import TasksContainer from "../tasksContainer";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) fetchData();
  }, [flag]);

  const fetchData = async () => {
    try {
      let res = await fetch("http://localhost:8000/allTasks", {
        method: "GET",
      });
      res = await res.json();
      res = res.sort((a, b) => a.isCheck === b.isCheck ? 0 : a.isCheck ? 1 : -1);
      setTasks(res);
      setFlag(false);
    } catch (e) {
      setFlag(false);
    }
  };

  const onChangeTasks = () => {
    setFlag(true);
  };

  return (
    <>
      <CreateTask onChangeTasks={onChangeTasks} />
      <TasksContainer tasks={tasks} onChangeTasks={onChangeTasks} />
    </>
  );
};

export default Tasks;
