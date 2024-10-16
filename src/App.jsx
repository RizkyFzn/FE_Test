// App.jsx
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from './store/auth';
import './App.css';
import Login from './views/LoginPage';
import Dashboard from './views/Dashboard';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(setUser({ token }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
