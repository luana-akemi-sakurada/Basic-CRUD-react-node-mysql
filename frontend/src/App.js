import {
  BrowserRouter,
  Routes,
  Route,
  Navigate // Add this import to fix the error
} from "react-router-dom";

import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import UpdateAccount from './pages/UpdateAccount';

function App() {
  return (
    <div className="App">
      {/* Wrap everything in AuthProvider to provide authentication context */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/update-account" 
              element={
                <PrivateRoute>
                  <UpdateAccount />
                </PrivateRoute>
              } 
            />
            {/* Redirect to login by default */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;