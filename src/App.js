import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/components/auth/useauth'; // Import the AuthProvider
import "./App.css";
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/Home';
import AddTool from './components/addtool';
import LoginForm from './components/login';
import Category from './components/category';
import Contact from './components/contact';
import Signup from './components/signup';
import RequireAuth from './components/auth/authrequired'; // Import the RequireAuth component
import Profile from './components/profile';
import Adminprofile from './components/admin-dashboard';
import Admintool from './components/admin-tool';
import EnquiryPage from './components/enquiry';
import ReviewModal from './components/star';
import ViewReviewsModal from './components/viewrev';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/addtool" element={<RequireAuth><AddTool /></RequireAuth>} />
          <Route path="/star" element={<RequireAuth><ReviewModal /></RequireAuth>} />
          <Route path="/viewrev" element={<RequireAuth><ViewReviewsModal /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/enquiry" element={<RequireAuth children={['Admin']}><EnquiryPage/></RequireAuth>}/>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/category" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<RequireAuth children={['Admin']}><Adminprofile/></RequireAuth>}/>
          <Route path="/admin-tool" element={<RequireAuth children={['Admin']}><Admintool/></RequireAuth>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
