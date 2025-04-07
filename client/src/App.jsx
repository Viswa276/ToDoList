import React from 'react';
import Login from './components/login';
import Register from './components/register';
import Task_list from './components/tasklist';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/task-list' element={<Task_list />} />
      </Routes>
    </Router>
  );
}

export default App;
