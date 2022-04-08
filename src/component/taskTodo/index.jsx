import changeIcons from "../../icons/pen.svg";
import deleteIcons from "../../icons/trash.svg";
import './task.scss';

const Task = ({ task, onChangeTasks }) => {

  const deleteTask = async () => {
    const answer = window.confirm('Are you sure?');
    if (!answer) return;
    await fetch(`http://localhost:8000/deleteTask?id=${task._id}`, {
      method: 'DELETE',
    });
    onChangeTasks();
  };

  return (
    <div className='box'>
      <div className='task'>
        <input value={task.isCheck} type='checkbox' />
        <p>{task.text}</p>
      </div>
      <div className='iconsBox'>
        <img src={changeIcons} alt='changeIcon' />
        <img
          src={deleteIcons}
          alt='deleteIcon'
          onClick={() => deleteTask()}
        />
      </div>
    </div>
  );
};

export default Task;