// TaskDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail = ({ tasks }) => {
    const { id } = useParams();
    const task = tasks.find((task) => task.id === parseInt(id, 10));

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div>
            <h2>Task Detail</h2>
            <p>Task ID: {task?.id}</p>
            <p>Task: {task?.text}</p>
            <p>Details: {task?.details}</p>
        </div>
    );
};

export default TaskDetail;
