import useFetch from 'react-fetch-hook';
import { Header } from './components/Header';
import { NewNote } from './components/NewNote';
import Task from './lib/Task';
import { removeTrailingSlash } from './utils/util';
import { useEffect, useState } from 'react';
import API_URL from './services/api';
import { Note } from './components/Note';

function App() {
  const { data, isLoading } = useFetch<Array<Task>>(
    removeTrailingSlash(API_URL) + '/api/tasks',
  );

  const favoriteTasks = data?.filter((task) => task.favorite) ?? [];
  const unFavoriteTasks = data?.filter((task) => !task.favorite) ?? [];

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

  const removeTask = () => {};

  const updateTask = () => {};

  return (
    <>
      <div>
        <Header />
        <div className="p-5 space-y-10">
          <div className="w-full flex justify-center">
            <NewNote newTask={addTask} />
          </div>
        </div>
        <div className="w-[1440px] mx-auto p-24 space-y-5">
          <div className="font-bold text-[#464646]">Favoritas</div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-start">
            {favoriteTasks.map((task) => (
              <div key={task.id}>
                <Note task={task} remove={removeTask} update={updateTask} />
              </div>
            ))}
          </div>

          <div className="font-bold text-[#464646]">Outras</div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-start">
            {unFavoriteTasks.map((task) => (
              <div key={task.id}>
                <Note task={task} remove={removeTask} update={updateTask} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
