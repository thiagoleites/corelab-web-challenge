import { useState } from 'react';
import Task from '../lib/Task';
import { Star } from './Star';
import { removeTrailingSlash } from '../utils/util';
import axios from 'axios';

interface INote {
  task: Task;
  remove: (id: string) => void;
  update: (task: Task) => void;
}

export const Note = ({ task: initialTask, remove, update }: INote) => {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(initialTask);

  const { id, title, description, favorite, color } = task;

  const updateTask = (property: string, value: any) => {
    const updatedTask = { ...task, [property]: value };
    setTask(updatedTask);
  };

  const save = () => {
    setEdit(false);
    axios.put(
      removeTrailingSlash(import.meta.env.API_URL) + '/api/tasks/' + id,
      task,
    );
  };

  const toggleFavorite = () => {
    const updatedFavorite = !favorite;
    updateTask('favorite', updatedFavorite);
    update({ ...task, favorite: updatedFavorite });
    axios.put(
      removeTrailingSlash(import.meta.env.API_URL) + '/api/tasks/' + id,
      { ...task, favorite: updatedFavorite },
    );
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const destroy = () => {
    axios.delete(
      removeTrailingSlash(import.meta.env.API_URL) + '/api/tasks/' + id,
    );
    remove(id);
  };

  return (
    <div>
      {edit ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => updateTask('title', e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => updateTask('description', e.target.value)}
          />
          <button onClick={save}>Salvar</button>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <Star checked={favorite} onChange={toggleFavorite} />
          <button onClick={handleEdit}>Editar</button>
          <button onClick={destroy}>Excluir</button>
        </div>
      )}
    </div>
  );
};
