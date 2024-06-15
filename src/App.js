import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavbarAdmin from './components/admin/NavbarAdmin';
import NavbarClient from './components/clients/NavbarClient';
import SidebarAdmin from './components/admin/SidebarAdmin';

import Students from './pages/admin/Students';
import Teachers from './pages/admin/Teachers';
import AddTeacher from './pages/admin/AddTeacher';
import QGrammarArrangeSentence from './pages/admin/questions/grammar/arrange_sentence/QGrammarArrangeSentence';
import QReading from './pages/admin/questions/reading/QReading';

function App() {
  const isUserAdmin = true;
  return (
    <div className="App">
      {isUserAdmin && <NavbarAdmin />}
      {!isUserAdmin && <NavbarClient />}
      <BrowserRouter>
        <div className='container'>
          {isUserAdmin && <SidebarAdmin />}
          <Routes>
            <Route path='/admin/students' element={<Students />} />
            <Route path='/admin/teachers' element={<Teachers />} />
            <Route path='/admin/teachers/add-teacher' element={<AddTeacher />} />
            <Route path='/admin/questions/grammar/arrange-sentence' element={<QGrammarArrangeSentence />} />
            <Route path='/admin/questions/reading/1' element={<QReading />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
