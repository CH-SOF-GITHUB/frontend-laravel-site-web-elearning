import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';
import CourseContent from './components/pages/CourseContent'
import MyAccount from './components/pages/MyAccount'
import CreateCourse from './components/instructor/pages/CreateCourse'
import AddVideo from './components/instructor/pages/AddVideo'
import MyCourses from './components/instructor/pages/MyCourses'
import CourseVideos from './components/instructor/pages/CourseVideos'
import CourseVideo from './components/instructor/pages/CourseVideo'

import QnA from './components/QnA';
import './App.css';
import InstructorDashboard from './components/instructor/pages/InstructorDashboard'
import { DialogsProvider } from '@toolpad/core'
import EnrollCourse from './components/pages/EnrollCourse'
import Blog from './components/pages/Blog'
import Success from './components/instructor/pages/Success'
import Cancel from './components/instructor/pages/Cancel'
import CategoryContent from './components/CategoryContent'


const App = () => {
  return (
    <DialogsProvider>
    <div className='App'>
      <Router>
        <Navbar />     
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/courses' element={<Courses />} />
          <Route path='/course_content/:id' element={<CourseContent/>} />
          <Route path='/category_content/:id' element={<CategoryContent/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/myaccount' element={<MyAccount />} />
          <Route path='/courses/enroll/:id' element={<EnrollCourse />} />
          <Route path='/blog' element={<Blog />} />

          {/* Instructor Routes */}
          <Route path='/student/mycourses' element={<MyCourses />} />
          <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
          <Route path='/instructor/dashboard' element={<InstructorDashboard />} />
          <Route path='/instructor/create_course' element={<CreateCourse />} />
          <Route path='/instructor/course_videos' element={<CourseVideos />} />
          <Route path='/instructor/course_video' element={<CourseVideo />} />
          <Route path='/instructor/add_video' element={<AddVideo />} />

          <Route path='/qna' element={<QnA />} />
        </Routes>

        <Footer />
      </Router>
    </div>
    </DialogsProvider>
  );
}

export default App;