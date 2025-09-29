import React, { useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import EditSection from "../editor/EditSection";

const Privacy = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [clicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const data = 'adad lorem34 adoi rewi;f q2werdf 2erfdew fcewrfdcw 32rdfew ergt56i8 67utrgfd wetyutiio tyrews reyui re'

  return (
    <div className="p-6">

 <EditSection
          setIsClicked={setIsClicked}
          data={data}
          type="privacy"
        />
    </div>
  );
};

export default Privacy;
