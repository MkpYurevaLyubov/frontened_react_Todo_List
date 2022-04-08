import './tasksTodo.scss';

const TasksTodo = ({ tasks }) => {
  return (
    <div className='taskBox'>
      {tasks.map((el, idx) => (
        <div key={`task-${idx}`} className='box'>
          <input value={el.isCheck} type='checkbox' />
          <p>{el.text}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksTodo;