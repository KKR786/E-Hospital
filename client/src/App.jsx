import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./hooks/useAuth";


import Nav from "./components/navbar/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./ui/NotFound";
import GetBlood from "./pages/GetBlood";
import GetDoctors from "./pages/GetDoctors";
import Profile from "./pages/Profile";
import UserManagement from "./pages/admin/UserManagement";
import Restricted from "./ui/Restricted";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        {user && <Nav />}
        <div className={`${user ? 'sm:ml-64 mt-14' : ''}`}>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path="/signup" element={!user ? <Register /> : <Navigate to='/' />} />
              
              <Route path="/" element={user ? <Dashboard /> : <Navigate to='/login' />} />
              <Route path="/find/blood" element={user ? <GetBlood /> : <Navigate to='/login' />} />
              <Route path="/find/doctor" element={user ? <GetDoctors /> : <Navigate to='/login' />} />
              <Route path="/find/therapist" element={user ? <GetDoctors /> : <Navigate to='/login' />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to='/login' />} />

              <Route path="/user-management" element={user ? (user?.role != 'Member' ? <UserManagement /> : <Restricted />) : <Navigate to='/login' />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
