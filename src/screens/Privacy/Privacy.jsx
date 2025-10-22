import React, { useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {useGetPrivacyQuery} from '../../../store/slices/apiSlice.js'

import EditSection from "../editor/EditSection";

const Privacy = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [clicked, setIsClicked] = useState(false);
  const {data: privacy, isLoading} = useGetPrivacyQuery()


  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  console.log(privacy,'tjesd')

  const data = 'adad lorem34 adoi rewi;f q2werdf 2erfdew fcewrfdcw 32rdfew ergt56i8 67utrgfd wetyutiio tyrews reyui re'

  if(isLoading){
  return(
    <p>Loading......</p>
  )
}


  return (
    <div className="p-6">

 <EditSection
          setIsClicked={setIsClicked}
          data={privacy?.text}
          type="privacy"
        />
    </div>
  );
};

export default Privacy;
