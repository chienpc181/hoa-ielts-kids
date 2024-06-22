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
import AdminRoute from './components/AdminRoute';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    dispatch(checkAuthStateThunk());
  }, [dispatch]);
  let isUserAdmin = user?.role === 'admin' ? true : false;
  
  return (
    <div className="App">
      <BrowserRouter>
        {isUserAdmin && <NavbarAdmin />}
        {!isUserAdmin && <NavbarClient />}
        <div className='container'>
          {isUserAdmin && <SidebarAdmin />}
          <Routes>
            <Route element={<AdminRoute isAllowed={isUserAdmin} />}>
              <Route path='/admin/students' element={<Students />} />
              <Route path='/admin/teachers' element={<AdminTeachers />} />
              <Route path='/admin/teachers/add-teacher' element={<AddTeacher />} />
              <Route path='/admin/questions/grammar/arrange-sentence' element={<QGrammarArrangeSentence />} />
              <Route path='/admin/questions/reading/1' element={<QReading />} />
            </Route>


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
