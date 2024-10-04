
  import { Route, Routes } from 'react-router-dom';
import Analytics from '../pages/Analytics';
  import Dashboard from '../pages/Dashboard';
import Ecommerce from '../pages/Ecommerce';
  import Login from '../pages/Login';
  import Signup from '../pages/Signup';


  const AppRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} /> {/* Default route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/eCommerce' element={<Ecommerce />} />
      </Routes>
    );
  };

  export default AppRoutes;
