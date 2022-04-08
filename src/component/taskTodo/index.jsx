import {useState} from 'react';
import changeIcons from '../../icons/pen.svg';
import deleteIcons from '../../icons/trash.svg';
import doneIcons from '../../icons/check.svg';
import closeIcons from '../../icons/close.svg';
import './task.scss';

const Task = ({ task, onChangeTasks }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(task.text);

  const deleteTask = async () => {
    const answer = window.confirm('Are you sure?');
    if (!answer) return;
    await fetch(`http://localhost:8000/deleteTask?id=${task._id}`, {
      method: 'DELETE',
    });
    onChangeTasks();
  };

  const updateTask = async () => {
    await fetch('http://localhost:8000/updateTask', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(task)
    });
    onChangeTasks();
  };

  const onChangeCheckbox = () => {
    task.isCheck = !task.isCheck;
    setIsEdit(false);
    updateTask();
  };

  const saveUpdateText = () => {
    const text = value.trim();
    if (!text) return alert('Enter text!');
    task.text = text;
    updateTask();
    setValue(text);
    setIsEdit(false);
  };

  return (
    <div className='box'>
      <div className='task'>
        <input
          checked={task.isCheck}
          type='checkbox'
          onChange={() => onChangeCheckbox()}
        />
        <p
          className={task.isCheck ? 'decoration' : isEdit ? 'displayNone' : ''}
        >
          {task.text}
        </p>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={isEdit ? 'inputText' : 'displayNone'}
        />
      </div>
      <div className='iconsBox'>
        <img
          src={changeIcons}
          alt='changeIcon'
          className={task.isCheck || isEdit ? 'displayNone' : ''}
          onClick={() => setIsEdit(!isEdit)}
        />
        <img
          src={deleteIcons}
          alt='deleteIcon'
          className={isEdit ? 'displayNone' : ''}
          onClick={deleteTask}
        />
        <img
          src={doneIcons}
          alt='doneIcons'
          className={isEdit ? '' : 'displayNone'}
          onClick={saveUpdateText}
        />
        <img
          src={closeIcons}
          alt='closeIcons'
          className={isEdit ? '' : 'displayNone'}
          onClick={() => setIsEdit(!isEdit)}
        />
      </div>
    </div>
  );
};

export default Task;