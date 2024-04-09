import { useState } from 'react';
import Task from '../lib/Task';
import { Star } from './Star';
import { removeTrailingSlash } from '../utils/util';
import axios from 'axios';
import API_URL from '../services/api';
import Close from '../icons/Close';
import Pencil from '../icons/Pencil';
import Bucket from '../icons/Bucket';

interface INote {
  task: Task;
  remove: (id: string) => void;
  update: (task: Task) => void;
}

export const Note = ({ task: initialTask, remove, update }: INote) => {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(initialTask);

  const { id, title, description, favorite, color } = task;

  const [selectedColor, setSelectedColor] = useState(color);

  const updateTask = (property: string, value: any) => {
    const updatedTask = { ...task, [property]: value };
    setTask(updatedTask);
  };

  const save = () => {
    setEdit(false);
    axios.put(removeTrailingSlash(API_URL) + '/api/tasks/' + id, {
      ...task,
      color: selectedColor,
    });
  };

  const toggleFavorite = () => {
    const updatedFavorite = !favorite;
    updateTask('favorite', updatedFavorite);
    update({ ...task, favorite: updatedFavorite });
    axios.put(removeTrailingSlash(API_URL) + '/api/tasks/' + id, {
      ...task,
      favorite: updatedFavorite,
    });
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleColorChange = (newColor: string) => {
    setTask((prevTask) => ({
      ...prevTask,
      color: newColor,
    }));
  };

  const destroy = () => {
    axios.delete(removeTrailingSlash(API_URL) + '/api/tasks/' + id);
    remove(id.toString());
  };

  return (
    <div
      className="w-[390px] bg-white rounded-[25px] shadow-md"
      style={{ backgroundColor: color }}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <input
          readOnly={!edit}
          type="text"
          className="bg-transparent file:placeholder:font-bold"
          onChange={(e) => updateTask('title', e.target.value)}
          placeholder="Título"
          value={title}
        />
        <Star onChange={toggleFavorite} checked={favorite} />
      </div>
      <div>
        <textarea
          readOnly={!edit}
          className="bg-transparent p-4 w-full outline-none resize-none"
          onChange={(e) => updateTask('description', e.target.value)}
          rows={15}
          placeholder="Clique ou arraste o arquivo para esta area para fazer upload."
          value={description}
        ></textarea>
      </div>

      <div className="flex flex-row justify-between space-x-2 p-4">
        {edit ? (
          <div className="flex gap-3">
            <div>
              <button onClick={save}>
                <Pencil />
              </button>
            </div>
            <div>
              <Bucket
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
              />
            </div>
          </div>
        ) : (
          <button onClick={handleEdit}>
            <Pencil />
          </button>
        )}
        {/* <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          value={color}
        /> */}
        <button onClick={destroy}>
          <Close />
        </button>
      </div>
    </div>
  );
};
