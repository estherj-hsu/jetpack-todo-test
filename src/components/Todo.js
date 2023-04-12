// Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Todo(props) {
  const { list } = props;
  const navigate = useNavigate();

  return (
    <>
      {list.map(((item, idx) =>
        <div className="border-b border-gray-200 py-3">
          <div key={item.id} className="flex items-center h-10 px-2 whitespace-nowrap overflow-hidden">
            <span
              onClick={() => props.handleUpdate(idx)}
              className={`flex cursor-pointer items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full hover:border-gray-400 ${item.completed ? 'bg-blue-500 border-blue-500 text-white hover:bg-blue-400 hover:border-blue-400' : ''}`}>
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
            <div className="cursor-pointer truncate" onClick={() => navigate(`/item/${item.id}`)}>
              <span className={`ml-4 text-sm hover:text-gray-600 ${item.completed ? 'line-through text-gray-400' : ''}`}>{item.title}</span>
            </div>
          </div>
          <div className="text-right text-xs text-gray-400 ">
            Last updated: {moment(item.updated_at).format("MMMM Do, h:mm:ss A")}
          </div>
        </div>))}
    </>
  );
}