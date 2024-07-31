
import './App.css';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import {Routes,Route} from 'react-router-dom';
import MainPage from './components/MainPage';
import { UserContextProvider } from './components/UserContext';
import Editor from './components/Editor';
import { useState } from 'react';
import EditPage from './components/EditPage';
import TaskPage from './components/TaskPage';
function App() {
  const [token,setToken]=useState(null);
  return (
    <UserContextProvider value={{token,setToken}}>
      <Routes>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/editor' element={<Editor/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/task-edit/:id' element={<EditPage/>}/>
        <Route path='/create/:id' element={<TaskPage/>}/>
      </Routes>

    </UserContextProvider>
    // <TaskPage/>
    
  );
}

export default App;
