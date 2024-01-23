// TaskList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, setTasks }) => {
    const [newTask, setNewTask] = useState({ text: '', details: '' });

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleAddTask = () => {
        if (newTask.text.trim() !== '') {
            setTasks([
                ...tasks,
                {
                    id: tasks.length + 1,
                    ...newTask,
                },
            ]);
            setNewTask({ text: '', details: '' });
        }
    };

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.text}{' '}
                        <Link to={`/tasks/${task.id}`}>Details</Link>{' '}
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <label>
                    Task:
                    <input
                        type="text"
                        name="text"
                        value={newTask.text}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Details:
                    <input
                        type="text"
                        name="details"
                        value={newTask.details}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskList;
