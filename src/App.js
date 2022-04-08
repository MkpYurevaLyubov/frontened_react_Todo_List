import {useState, useEffect} from 'react';
import InputTodo from './component/inputTodo/index';
import TasksTodo from './component/tasksTodo/index';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) fetchData();
  }, [flag]);

  const fetchData = async () => {
    let res = await fetch('http://localhost:8000/allTasks', {
      method: 'GET',
    });
    res = await res.json();
    setTasks(res);
    setFlag(false);
  };

  const onChangeTasks = () => {
    setFlag(true);
  };

  return (
    <div className='main'>
      <InputTodo onChangeTasks={onChangeTasks} />
      <TasksTodo tasks={tasks} onChangeTasks={onChangeTasks} />
    </div>
  );
};

export default App;
