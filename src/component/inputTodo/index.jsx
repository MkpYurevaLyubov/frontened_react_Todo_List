import { useState } from 'react';
import './inputTodo.scss';

const InputTodo = ({ onChangeTasks }) => {
  const [value, setValue] = useState('');

  const onClickBtn = async () => {
    const text = value.trim();
    if (!text) return alert('Enter task!');
    const resp = await fetch('http://localhost:8000/createTask', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        text,
        isCheck: false,
      })
    });
    const result = await resp.json();
    onChangeTasks(result);
    setValue('');
  };

  return (
    <div className='main'>
      <h1>To-do list</h1>
      <div className="inputBlock">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={onClickBtn}>Click</button>
      </div>
    </div>
  );
};

export default InputTodo;