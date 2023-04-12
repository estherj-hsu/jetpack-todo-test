// Dependencies
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';

export default function Item(props) {
  const { list } = props;
  const [isVisible, setVisible] = useState(false);
  const urlParams = useParams();
  const navigate = useNavigate();
  const item = list.find(post => post.id === Number(urlParams.id));
  const idx = list.map(e => e.id).indexOf(item.id);

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/');
        props.handleDelete(id);
      });
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">
        {item.title}
      </h2>
      <div className="py-5 text-sm text-gray-600">
        Status:
        <span
          onClick={() => props.handleUpdate(idx)}
          className={`inline-block ml-3 align-middle cursor-pointer mr-2 text-transparent border-2 border-gray-300 rounded-full hover:border-gray-400 ${item.completed ? 'isChecked' : ''}`}>
          <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
      <p className="mt-5 text-neutral-400">{item.body}</p>
      <div className="py-10 text-right text-xs text-gray-400">
        Last updated: {moment(item.updated_at).format("MMMM Do, h:mm:ss A")}<br/>
        Created: {moment(item.created_at).format("MMMM Do, h:mm:ss A")}
      </div>
      <div className="mt-10 flex space-x-4 space-y-2 flex-wrap justify-end items-baseline">
        <button
          onClick={() => setVisible(true)}
          className="rounded px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300">Delete</button>
        <button
          onClick={() => navigate(`/edit/${item.id}`)}
          className="rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-300">Edit</button>
      </div>

      <div className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${isVisible ? '' : 'hidden'}`}>
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
          <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className="bg-gray-200 p-5 text-center">
              <h3 className="text-baseline my-10 text-gray-600">Are you sure you want to delete this item?</h3>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="rounded py-2 px-4 bg-gray-500 text-white hover:bg-gray-700 mr-4">Cancel</button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="rounded px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}