<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Forgotpassword from "./pages/forgotpassword";

import Index from "./pages/Index"; // make sure file name matches exactly
import Petitions from "./pages/Petitions";
import PetitionDetail from "./pages/PetitionDetail";
import Polls from "./pages/Polls";
=======
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Analytics from "./pages/analytics";
// import Login from "./pages/login";
// import Register from "./pages/register";
// import Forgotpassword from "./pages/forgotpassword";
// import Index from "./pages/Index";
// import NotFound from "./pages/notfound";
// import PetitionDetail from "./pages/PetitionDetail";
// import Petitions from "./pages/Petitions";
// import CreatePetition from "./pages/createPetition";
// import Polls from "./pages/Polls";
// import Reports from "./pages/Reports";
// import "./App.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <div style={{ width: "100%", minHeight: "100vh" }}>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/index" element={<Index />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgotpassword" element={<Forgotpassword />} />
//           <Route path="/notfound" element={<NotFound />} />
//           <Route path="/PetitionDetail" element={<PetitionDetail />} />
//           <Route path="/petitions" element={<Petitions />} />
//           <Route path="/petitions/create" element={<CreatePetition />} />
//           <Route path="/polls" element={<Polls />} />
//           <Route path="/reports" element={<Reports />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Analytics from "./pages/analytics";
// import Login from "./pages/MainLogin";
// import CitizenLogin from "./pages/CitizenLogin";
// import OfficialLogin from "./pages/OfficialLogin";
// import CitizenDashboard from "./pages/CitizenDashboard";
// import OfficialDashboard from "./pages/OfficialDashboard";
// import Register from "./pages/register";
// import Forgotpassword from "./pages/forgotpassword";
// import Index from "./pages/Index";
// import NotFound from "./pages/notfound";
// import PetitionDetail from "./pages/PetitionDetail";
// import Petitions from "./pages/Petitions";
// import CreatePetition from "./pages/createPetition";
// import EditPetition from "./pages/EditPetition";
// import Polls from "./pages/Polls";
// import Reports from "./pages/Reports";
// import "./App.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <div style={{ width: "100%", minHeight: "100vh" }}>
//         <Routes>

//           {/* Auth */}
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgotpassword" element={<Forgotpassword />} />
//           <Route path="/login/citizen" element={<CitizenLogin />} />
//           <Route path="/login/official" element={<OfficialLogin />} />

//           {/* Dashboard (legacy index + new dashboards) */}
//           <Route path="/index" element={<Index />} />
//           <Route path="/dashboard" element={<CitizenDashboard />} />
//           <Route path="/dashboard/petitions" element={<Petitions />} />
//           <Route path="/dashboard/polls" element={<Polls />} />
//           <Route path="/dashboard/reports" element={<Reports />} />
//           <Route path="/official-dashboard" element={<OfficialDashboard />} />
//           <Route path="/analytics" element={<Analytics />} />

//           {/* Petitions */}
//           <Route path="/petitions" element={<Petitions />} />
//           <Route path="/petitions/create" element={<CreatePetition />} />
//           <Route path="/edit-petition/:id" element={<EditPetition />} />

//           {/* ✅ IMPORTANT: Dynamic Petition Detail Route */}
//           <Route path="/petitions/:id" element={<PetitionDetail />} />

//           {/* 404 */}
//           <Route path="*" element={<NotFound />} />

//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./pages/analytics";
import Login from "./pages/MainLogin";
import CitizenLogin from "./pages/CitizenLogin";
import OfficialLogin from "./pages/OfficialLogin";
import CitizenDashboard from "./pages/CitizenDashboard";
import OfficialDashboard from "./pages/OfficialDashboard";
import Register from "./pages/register";
import Forgotpassword from "./pages/forgotpassword";
import NotFound from "./pages/notfound";
import PetitionDetail from "./pages/PetitionDetail";
import Petitions from "./pages/Petitions";
import CreatePetition from "./pages/createPetition";
import EditPetition from "./pages/EditPetition";
import PollsPage from './pages/PollsPage';
import PollDetailPage from './pages/PollDetailPage';
import CreatePollPage from './pages/CreatePollPage';

>>>>>>> a98f331e3489bce2f6564e5380f6b091f562af62
import Reports from "./pages/Reports";
import Analytics from "./pages/analytics";
import NotFound from "./pages/notfound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
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
=======
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <Routes>

          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/login/citizen" element={<CitizenLogin />} />
          <Route path="/login/official" element={<OfficialLogin />} />

          {/* Dashboards */}
          <Route path="/dashboard" element={<CitizenDashboard />} />
          <Route path="/dashboard/petitions" element={<Petitions />} />
          <Route path="/dashboard/polls" element={<PollsPage />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/official-dashboard" element={<OfficialDashboard />} />
          <Route path="/analytics" element={<Analytics />} />

          {/* Petitions */}
          <Route path="/petitions" element={<Petitions />} />
          <Route path="/petitions/create" element={<CreatePetition />} />
          <Route path="/edit-petition/:id" element={<EditPetition />} />
          <Route path="/petitions/:id" element={<PetitionDetail />} />
         <Route path="/official-dashboard" element={<OfficialDashboard />} />
 
          {/*Polls*/}
          <Route path="/dashboard/polls" element={<PollsPage />} />
          <Route path="/poll/:id" element={<PollDetailPage />} />
          <Route path="/create" element={<CreatePollPage />} />
          
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
>>>>>>> a98f331e3489bce2f6564e5380f6b091f562af62
    </BrowserRouter>
  );
}

export default App;