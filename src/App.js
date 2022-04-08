import {useState, useEffect} from 'react';
import InputTodo from './component/inputTodo/index';
import TasksTodo from './component/tasksTodo/index';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('http://localhost:8000/allTasks', {
        method: 'GET',
      });
      res = await res.json();
      setTasks(res);
    };
    fetchData();
  }, []);

  const onChangeTasks = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className='main'>
      <InputTodo onChangeTasks={onChangeTasks} />
      <TasksTodo tasks={tasks} />
    </div>
  );
};

export default App;
