import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Item from './Item';
import { fetchList } from '../common/api';

export default function Main(props) {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMain = pathname === "/";

  useEffect(() => {
    getList();
  });

  const getList = async () => {
    if(list.length === 0) {
      const newList = await fetchList();
      setList(newList);
    }
  }

  const updateStatus = (idx) => {
    const newList = [...list];
    newList[idx].completed = !newList[idx].completed;
    newList[idx].updated_at = Date();
    setList(newList);
  }

  const updateList = (id) => {
    let newList = [...list];
    setList(newList.filter(item => item.id !== id));
  }

  const handleAddItem = (item) => {
    const newList = [item, ...list];
    setList(newList);
  }

  const handleEditItem = (item) => {
    const newList = [...list];
    const idx = newList.map(e => e.id).indexOf(item.id);
    newList[idx] = item;
    setList(newList);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto text-gray-700 pb-10">
        <header className="max-w-3xl mx-auto grid grid-cols-5 gap-0 px-2">
          <div className="col-start-1 col-end-4">
            <h1 className="text-3xl font-bold py-5"><span role="img" aria-label="rocket">🚀</span> Jetpack TODO</h1>
          </div>
          <div className="col-start-4 col-end-6 py-5 text-right">
            <button
              onClick={() => navigate(isMain ? '/add' : '/')}
              className="border-blue-500 bg-white border-2 hover:border-blue-600 text-blue-600 py-2 px-4 rounded">
                <svg class="w-5 h-5 inline-block text-blue-500 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMain ?
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  :
                    <path fill-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" />
                  }
                </svg>
                {isMain ? 'Add' : 'Back'}</button>
          </div>
        </header>
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg w-96">
          <Routes>
            <Route
              path="/"
              element={<Todo handleUpdate={updateStatus} list={list} />} />
            <Route
              path="/add"
              element={<TodoForm maxId={Math.max(...list.map(o => o.id))} handleSubmit={handleAddItem} isEditing={false} />} />
            <Route
              path="/edit/:id"
              element={<TodoForm list={list} handleSubmit={handleEditItem} isEditing={true} />} />
            <Route
              path="/item/:id"
              element={<Item list={list} handleUpdate={updateStatus} handleDelete={updateList}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}