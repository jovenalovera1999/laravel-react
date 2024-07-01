import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from "./pages/Students";
import CreateStudent from "./pages/CreateStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Students} />
        <Route path="/create/student" Component={CreateStudent} />
      </Routes>
    </Router>
  );
}

export default App;
