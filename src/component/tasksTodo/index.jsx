import changeIcons from '../../icons/pen.svg';
import deleteIcons from '../../icons/trash.svg'
import './tasksTodo.scss';

const TasksTodo = ({ tasks, onChangeTasks }) => {
  const deleteTask = async (idx) => {
    const answer = window.confirm('Are you sure?');
    if (!answer) return;
    await fetch(`http://localhost:8000/deleteTask?id=${tasks[idx]._id}`, {
      method: 'DELETE',
    });
    onChangeTasks();
  };

  return (
    <div className='taskBox'>
      {tasks.map((task, idx) => (
        <div key={`task-${idx}`} className='box'>
          <div className='task'>
            <input value={task.isCheck} type='checkbox' />
            <p>{task.text}</p>
          </div>
          <div className='iconsBox'>
            <img src={changeIcons} alt='changeIcon' />
            <img
              src={deleteIcons}
              alt='deleteIcon'
              onClick={() =>deleteTask(idx)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksTodo;