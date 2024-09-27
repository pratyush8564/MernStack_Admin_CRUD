import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  
  return (
    <Router>
      <ToastContainer />
      <AppRoutes />
    </Router>

  );
};

export default App;
