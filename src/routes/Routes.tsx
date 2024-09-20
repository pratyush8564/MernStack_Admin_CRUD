
  import { Route, Routes } from 'react-router-dom';
  import Dashboard from '../pages/Dashboard';
  import Login from '../pages/Login';
  import Signup from '../pages/Signup';


  const AppRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} /> {/* Default route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    );
  };

  export default AppRoutes;
