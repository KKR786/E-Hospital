import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./hooks/useAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

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

              <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
