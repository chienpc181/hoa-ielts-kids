import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavbarAdmin from './components/admin/NavbarAdmin';
import NavbarClient from './components/clients/NavbarClient';
import SidebarAdmin from './components/admin/SidebarAdmin';

import Students from './pages/admin/Students';
import AdminTeachers from './pages/admin/Teachers';
import AddTeacher from './pages/admin/AddTeacher';
import QGrammarArrangeSentence from './pages/admin/questions/grammar/arrange_sentence/QGrammarArrangeSentence';
import QReading from './pages/admin/questions/reading/QReading';

import Teachers from './pages/clients/Teachers';

import Register from './pages/login/Register';
import Login from './pages/login/Login';
import Home from './pages/Home';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthStateThunk } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log(user);
  let isUserAdmin = user ? (user.role === 'admin' ? true : false) : false;
  console.log(isUserAdmin);
  useEffect(() => {
    dispatch(checkAuthStateThunk());
  }, [ dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        {isUserAdmin && <NavbarAdmin />}
        {!isUserAdmin && <NavbarClient />}
        <div className='container'>
          {isUserAdmin && <SidebarAdmin />}
          <Routes>
            <Route path='/admin/students' element={<Students />} />
            <Route path='/admin/teachers' element={<AdminTeachers />} />
            <Route path='/admin/teachers/add-teacher' element={<AddTeacher />} />
            <Route path='/admin/questions/grammar/arrange-sentence' element={<QGrammarArrangeSentence />} />
            <Route path='/admin/questions/reading/1' element={<QReading />} />

            <Route path='/teachers' element={<Teachers />} />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
