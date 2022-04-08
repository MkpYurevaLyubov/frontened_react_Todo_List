import Task from '../taskTodo/index';
import './tasksTodo.scss';

const TasksTodo = ({ tasks, onChangeTasks }) => {
    return (
    <div className='taskBox'>
      {tasks.map((task) => (
        <div key={task._id}>
          <Task task={task} onChangeTasks={onChangeTasks} />
        </div>
      ))}
    </div>
  );
};

export default TasksTodo;