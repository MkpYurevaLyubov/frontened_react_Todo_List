import Task from '../taskTodo/index';
import './tasksTodo.scss';

const TasksTodo = ({ tasks, onChangeTasks }) => {
    return (
    <div className='taskBox'>
      {tasks.map((task, idx) => (
        <div key={`task-${idx}`}>
          <Task task={task} onChangeTasks={onChangeTasks} />
        </div>
      ))}
    </div>
  );
};

export default TasksTodo;