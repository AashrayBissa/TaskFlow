import './App.css'

import {Routes, Route} from "react-router-dom";

import Homepage from './pages/userPages/Homepage'
import Login from './pages/userPages/Login/Login'
import Signup from "./pages/userPages/Signup/Signup"
import NewTask from './pages/taskPages/NewTask';
import EditTask from './pages/taskPages/EditTask';
import Dashboard from "./pages/taskPages/Dashboard";
import Profile from "./pages/userPages/Profile";

import NotFound from "./pages/NotFound"

import { Toaster } from 'react-hot-toast';

function App() {
  
  return (
    <>
      <Toaster position="bottom-right"/>
       <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard/search' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path="/dashboard/addTask" element={<NewTask/>} />
          <Route path="/dashboard/editTask/:id" element={<EditTask/>} />
          <Route path="*" element={<NotFound/>} />
          
       </Routes>
    </>
  );
}

export default App
