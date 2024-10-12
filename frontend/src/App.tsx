import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Students from "./pages/Students";
import CreateStudent from "./pages/CreateStudent";
import UpdateStudent from "./pages/UpdateStudent";
import DeleteStudent from "./pages/DeleteStudent";

function App() {
  const isAuthenticated = !!localStorage.getItem("auth_token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/add" element={<CreateUser />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student/create" element={<CreateStudent />} />
        <Route path="/student/edit/:student_id" element={<UpdateStudent />} />
        <Route path="/student/delete/:student_id" element={<DeleteStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
