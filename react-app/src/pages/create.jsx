// CreateTodo.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/todos/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                setTitle('');
                setDescription('');
                setTimeout(() => {
                    navigate('/view');
                }, 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create Todo');
            }
        } catch (err) {
            console.error('Request error:', err);
            setError('An error occurred while creating the todo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create a New Todo</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} id="todoForm">
                <label htmlFor="title">Name:</label><br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="description">Description:</label><br />
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                /><br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Todo'}
                </button>
            </form>
            <a href="/view" className="button">View Page</a>
        </div>
    );
};

export default CreateTodo;
