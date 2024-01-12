import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
// import { useSelector } from "react-redux";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import SuperAdmin from "./Pages/SuperAdmin/SuperAdmin";
import Admin from "./Pages/Admin/Admin";
import User from "./Pages/User/User";
import Learning from "./Pages/Learning/Learning";
import TaskPage from "./Pages/TaskPage/TaskPage";
import EditUserDetails from "./Pages/EditUserDetails/EditUserDetails";
function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/super-admin" element={<SuperAdmin />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/admin" element={<EditUserDetails />} /> */}
            <Route path="/user" element={<User />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/tasks" element={<TaskPage />} />
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
