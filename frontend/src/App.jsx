import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./pages/analytics";
import Login from "./pages/login";
import Register from "./pages/register";
import Forgotpassword from "./pages/forgotpassword";
import Index from "./pages/Index";
import NotFound from "./pages/notfound";
import PetitionDetail from "./pages/PetitionDetail";
import Petitions from "./pages/Petitions";
import Polls from "./pages/Polls";
import Reports from "./pages/Reports";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/index" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/PetitionDetail" element={<PetitionDetail />} />
          <Route path="/petitions" element={<Petitions />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
