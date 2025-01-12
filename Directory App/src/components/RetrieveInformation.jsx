import React, { useState } from "react";
import RetrieveInformation from "../components/RetrieveInformation";

const RetrievePage = () => {
  const [people] = useState(JSON.parse(localStorage.getItem("people")) || []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Retrieve Information</h1>
      <RetrieveInformation people={people} />
    </div>
  );
};

export default RetrievePage;
