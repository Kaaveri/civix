import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import CreatePetition from "./pages/createpetition";
import PetitionList from "./pages/petitionList";
import CreatePoll from "./pages/createPoll";
import Reports from "./pages/Reports";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-petition" element={<CreatePetition />} />
          <Route path="/petitions" element={<PetitionList />} />
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
