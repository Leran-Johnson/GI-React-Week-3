import './App.css';
import Counter from './components/counter';
import MovieApp from './components/MovieApp';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <Router>
      <div>
        <Counter />
        <MovieApp />
        <nav>
          <ul>
            <li>
              <Link to="/">Task List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<TaskList tasks={tasks} setTasks={setTasks} />}
          />
          <Route
            path="/tasks/:id"
            element={<TaskDetail tasks={tasks} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




