import React, { useState } from "react";
import AddNewPerson from "../components/AddNewPerson";

const AddPersonPage = () => {
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("people")) || []
  );

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Person</h1>
      <AddNewPerson
        people={people}
        setPeople={setPeople}
        calculateAge={calculateAge}
      />
    </div>
  );
};

export default AddPersonPage;
