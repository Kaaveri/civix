import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Forgotpassword from "./pages/forgotpassword";

import Index from "./pages/Index"; // make sure file name matches exactly
import Petitions from "./pages/Petitions";
import PetitionDetail from "./pages/PetitionDetail";
import Polls from "./pages/Polls";
import Reports from "./pages/Reports";
import Analytics from "./pages/analytics";
import NotFound from "./pages/notfound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />

        {/* pages */}
        <Route path="/index" element={<Index />} />
        <Route path="/petitions" element={<Petitions />} />
        <Route path="/petitions/:id" element={<PetitionDetail />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;