import useFetch from 'react-fetch-hook';
import { Header } from './components/Header';
import { NewNote } from './components/NewNote';
import Task from './lib/Task';
import { removeTrailingSlash } from './utils/util';
import { useEffect, useState } from 'react';
import API_URL from './services/api';

function App() {
  const { data, isLoading } = useFetch<Array<Task>>(
    removeTrailingSlash(API_URL) + '/api/tasks',
  );

  const [tasks, setTasks] = useState<Array<Task>>(data ?? []);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  useEffect(() => {
    if (data) {
      setTasks((prevTasks) => [...prevTasks, ...data]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Header />
        <div className="p-5 space-y-10">
          <div className="w-full flex justify-center">
            <NewNote newTask={addTask} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
