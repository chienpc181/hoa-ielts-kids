import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavbarAdmin from './components/admin/NavbarAdmin';
import NavbarClient from './components/clients/NavbarClient';
import SidebarAdmin from './components/admin/SidebarAdmin';

import AdminStudents from './pages/admin/Students';
import AddStudent from './pages/admin/AddStudent';
import AdminTeachers from './pages/admin/Teachers';
import AddTeacher from './pages/admin/AddTeacher';
import QGrammarArrangeSentence from './pages/admin/questions/grammar/arrange_sentence/QGrammarArrangeSentence';
import QReading from './pages/admin/questions/reading/QReading';
import QReadingWithImage from './pages/admin/questions/reading/QReadingWithImage';
import CreateStoryStandard from './pages/admin/stories/CreateStoryStandard';
import CreateLessonStandard from './pages/admin/lessons/CreateLessonStandard';
import EditStoryStandard from './pages/admin/stories/EditStoryStandard';
import EditLessonStandard from './pages/admin/lessons/EditLessonStandard';

import Teachers from './pages/clients/Teachers';
import Students from './pages/clients/Students';
import Practices from './pages/clients/Practices';
import Stories from './pages/clients/stories/Stories';
import StoryDetail from './pages/clients/stories/StoryDetail';
import FairyStories from './pages/clients/stories/FairyStories';
import FairyStory from './pages/clients/stories/FairyStory';
import StudentDetail from './pages/clients/StudentDetail';
import Lessons from './pages/clients/lessons/Lessons';
import LessonDetail from './pages/clients/lessons/LessonDetail';

import Register from './pages/login/Register';
import Login from './pages/login/Login';
import Home from './pages/Home';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthStateThunk } from './features/auth/authSlice';
import AdminRoute from './components/AdminRoute';
import { useSpeechSynthesis } from 'react-speech-kit';
import { setVoices, setSelectedVoice } from './features/language/speechSynthesisSlice';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    dispatch(checkAuthStateThunk());
  }, [dispatch]);
  

  const { voices } = useSpeechSynthesis();
  useEffect(() => {
    const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
    
    if (englishVoices.length > 0) {
      dispatch(setSelectedVoice(englishVoices[0]));
    }
    else {
      dispatch(setSelectedVoice(voices[0]));
    }
  }, [voices, dispatch]);

  if (authStatus === 'idle' || authStatus === 'loading') {
    return (
      <div>Loading...</div>
    )
  }
  
  
  const isUserAdmin = user?.roles.includes('admin') ? true : false;

  return (
    <div className="App" id='app'>
      <BrowserRouter>
        {isUserAdmin && <NavbarAdmin />}
        {!isUserAdmin && <NavbarClient />}
        <main className='container' id='app-container'>
          {isUserAdmin && <SidebarAdmin />}
          <Routes>
            <Route element={<AdminRoute isAllowed={isUserAdmin}/> }>
              <Route path='/admin/students' element={<AdminStudents />} />
              <Route path='/admin/students/add-student' element={<AddStudent />} />
              <Route path='/admin/teachers' element={<AdminTeachers />} />
              <Route path='/admin/teachers/add-teacher' element={<AddTeacher />} />
              <Route path='/admin/questions/grammar/arrange-sentence' element={<QGrammarArrangeSentence />} />
              <Route path='/admin/questions/reading/1' element={<QReading />} />
              <Route path='/admin/questions/images/image' element={<QReadingWithImage />} />
              <Route path='/admin/stories' element={<CreateStoryStandard />} />
              <Route path='/admin/stories/:id' element={<EditStoryStandard />} />
              <Route path='/admin/lessons' element={<CreateLessonStandard />} />
              <Route path='/admin/lessons/:id' element={<EditLessonStandard />} />
            </Route>


            <Route path='/teachers' element={<Teachers />} />
            <Route path='/students' element={<Students />} />
            <Route path='/students/:id' element={<StudentDetail />} />
            <Route path='/practices' element={<Practices />} />
            <Route path='/stories' element={<Stories />} />
            <Route path='/fairy-stories' element={<FairyStories />} />
            <Route path='/fairy-stories/:id' element={<FairyStory />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path='/lessons' element={<Lessons />} />
            <Route path="/lessons/:id" element={<LessonDetail />} />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
