import React, { useState } from "react";
import AddNewPerson from "../components/AddNewPerson";

const AddPersonPage = () => {
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("people")) || []
  );

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const saveToLocalStorage = (updatedPeople) => {
    localStorage.setItem("people", JSON.stringify(updatedPeople));
    setPeople(updatedPeople);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Person</h1>
      <AddNewPerson
        people={people}
        setPeople={saveToLocalStorage}
        calculateAge={calculateAge}
      />
    </div>
  );
};

export default AddPersonPage;
