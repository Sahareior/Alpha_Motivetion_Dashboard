import React, { useState } from "react";

import EditSection from "../editor/EditSection";
import { useGetTermsQuery } from "../../../store/slices/apiSlice";

const Terms = () => {
const {data:terms,isLoading} = useGetTermsQuery()

if(isLoading){
  return(
    <p>Loading......</p>
  )
}

console.log(terms,'tsd')

  const data = "This is the ultimate trems so be careful";

  return (
    <div className="p-6">
      <EditSection section={'terms'} data={terms?.text} />
    </div>
  );
};

export default Terms;
