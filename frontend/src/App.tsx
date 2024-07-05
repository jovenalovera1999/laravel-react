import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from "./pages/Students";
import CreateStudent from "./pages/CreateStudent";
import UpdateStudent from "./pages/UpdateStudent";
import DeleteStudent from "./pages/DeleteStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/student/create" element={<CreateStudent />} />
        <Route path="/student/edit/:student_id" element={<UpdateStudent />} />
        <Route path="/student/delete/:student_id" element={<DeleteStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
