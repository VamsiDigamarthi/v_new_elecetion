import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
import { useSelector } from "react-redux";
import NotAccess from "./Pages/NotAccess/NotAccess";
import Payment from "./Pages/Payment/Payment";
import Certificate from "./Pages/Certificate/Certificate";
import DetailsPs from "./Pages/DetailsPs/DetailsPs";
function App() {
  const UUU = useSelector((state) => state.authReducer.authData);
  // console.log(UUU);
  // console.log(UUU[0].role);
  return (
    <div className="App">
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/register" element={<Register />} />

            {/* <Route path="/" element={<Home />} /> */}

            <Route
              path="/"
              element={
                UUU ? (
                  UUU[0].role === 1 ? (
                    <Home />
                  ) : UUU[0].role === 2 ? (
                    <Navigate to="/admin" />
                  ) : (
                    <Navigate to="/user" />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />

            <Route
              path="/super-admin"
              element={
                UUU ? (
                  UUU[0].role === 1 ? (
                    <SuperAdmin />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            {/*  */}
            <Route
              path="/admin"
              element={
                UUU ? (
                  UUU[0].role === 2 ? (
                    <Admin />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/detailsps"
              element={
                UUU ? (
                  UUU[0].role === 2 ? (
                    <DetailsPs />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            {/* admin routes */}
            <Route
              path="/user"
              element={
                UUU ? (
                  UUU[0].role === 3 ? (
                    <User />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />

            <Route
              path="/learning"
              element={
                UUU ? (
                  UUU[0].role === 3 ? (
                    <Learning />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/tasks"
              element={
                UUU ? (
                  UUU[0].role === 3 ? (
                    <TaskPage />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />

            <Route
              path="/payment"
              element={
                UUU ? (
                  UUU[0].role === 3 ? (
                    <Payment />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />

            <Route
              path="/certificate"
              element={
                UUU ? (
                  UUU[0].role === 3 ? (
                    <Certificate />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />

            {/* <Route path="/certificate" element={<Certificate />} /> */}

            {/* <Route path="/payment" element={<Payment />} /> */}
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
