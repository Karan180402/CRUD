import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:4000/todos/view', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Failed to fetch todos:', error);
            alert('Error fetching todos. Please try again later.');
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error deleting todo:', errorText);
                alert('Failed to delete todo. Please try again.');
                return;
            }
            fetchTodos(); // Refresh the todo list after deletion
        } catch (error) {
            console.error('Failed to delete todo:', error);
            alert('Error deleting todo. Please try again later.');
        }
    };

    // Update a todo
    const updateTodo = (id) => {
        navigate(`/update/${id}`);
    };

    // Logout function
    const logout = async () => {
        try {
            const response = await fetch('http://localhost:4000/auth/logout', { method: 'POST' });
            if (response.ok) {
                // Remove token from local storage
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                navigate('/'); // Redirect to login page
            } else {
                const errorText = await response.text();
                console.error('Logout failed:', errorText);
                alert('Logout failed! Please try again.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Error during logout. Please try again later.');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <div id="todos">
                {todos.map(todo => (
                    <div key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <button onClick={() => updateTodo(todo.id)}>Update</button>
                    </div>
                ))}
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Todos;
