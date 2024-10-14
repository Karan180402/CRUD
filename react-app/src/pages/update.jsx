// src/pages/update.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({ title: '', description: '' });

    useEffect(() => {
        const fetchTodo = async () => {
            const response = await fetch(`http://localhost:4000/todos/${id}`);
            const data = await response.json();
            setTodo({
                title: data.title,
                description: data.description,
            });
        };
        fetchTodo();
    }, [id]);

    const updateTodo = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:4000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        navigate('/view');
    };

    return (
        <div>
            <h1>Update Todo</h1>
            <form onSubmit={updateTodo}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={todo.title}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                        required
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        value={todo.description}
                        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                        required
                    />
                </label>
                <br />
                <button type="submit">Update Todo</button>
            </form>
        </div>
    );
};

export default UpdateTodo;
