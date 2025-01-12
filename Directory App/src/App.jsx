import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddPersonPage from "./pages/AddPersonPage";
import RetrievePage from "./pages/RetrievePage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddPersonPage />} />
        <Route path="/retrieve" element={<RetrievePage />} />
      </Routes>
    </div>
  );
};

export default App;
