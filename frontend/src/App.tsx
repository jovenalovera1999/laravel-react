import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from "./pages/Students";
import CreateStudent from "./pages/CreateStudent";
import UpdateStudent from "./pages/UpdateStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/student/create" element={<CreateStudent />} />
        <Route path="/student/edit/:student_id" element={<UpdateStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
