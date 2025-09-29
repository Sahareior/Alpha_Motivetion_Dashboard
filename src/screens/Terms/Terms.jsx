import React, { useState } from "react";

import EditSection from "../editor/EditSection";

const Terms = () => {
  const data = "This is the ultimate trems so be careful";

  return (
    <div className="p-6">
      <EditSection data={data} />
    </div>
  );
};

export default Terms;
