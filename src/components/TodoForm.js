// Dependencies
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TodoForm(props) {
  const { list, isEditing, maxId } = props;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const urlParams = useParams();
  const navigate = useNavigate();
  const item = isEditing ? list.find(post => post.id === Number(urlParams.id)) : {};
  const isEmpty = body.length === 0 || title.length === 0;

  useEffect(() => {
    if (isEditing) {
      setTitle(item.title);
      setBody(item.body);
    }
  }, [isEditing, item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${urlParams.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          props.handleSubmit({
            ...json,
            completed: item.completed,
            updated_at: Date(),
          });
          navigate('/');
        });
    } else {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json, maxId);
          props.handleSubmit({
            ...json,
            completed: false,
            id: maxId + 1,
            created_at: Date(),
            updated_at: Date(),
          });
          navigate('/');
        });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-5">
          <label
            for="title"
            class="block mb-2 font-bold text-gray-600">Title</label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            class="border border-gray-300 shadow p-3 w-full rounded mb-" />
        </div>
        <div class="mb-5">
          <label
            for="body"
            class="block mb-2 font-bold text-gray-600">Description</label>
          <textarea
            required
            rows={5}
            id="body"
            name="body"
            value={body}
            onChange={e => setBody(e.target.value)}
            class="border border-gray-300 shadow p-3 w-full rounded mb-" />
        </div>
        <div className="mt-4 text-right">
          <button
            type="submit"
            disabled={isEmpty}
            class={`rounded px-4 py-2 bg-${isEmpty ? 'gray' : 'blue'}-500 text-white ${isEmpty ? 'cursor-not-allowed' : 'hover:bg-blue-600'} duration-300`}>{isEditing ? 'Edit' : 'Create'}</button>
        </div>
      </form>
    </>
  );
}