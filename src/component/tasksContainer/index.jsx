import React from "react";
import Task from "../task";
import "./tasksContainer.scss";

const TasksContainer = ({tasks, onChangeTasks}) => {
  return (
    <div className="taskBox">
      {tasks.map((task) => (
        <div key={task._id}>
          <Task task={task} onChangeTasks={onChangeTasks}/>
        </div>
      ))}
    </div>
  );
};

export default TasksContainer;
