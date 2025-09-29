import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Editor from "./Editor";



const EditSection = ({ data }) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);


  const quillRef = useRef(null);



  // Load initial content into Quill when editor is ready




  return (
    <div
      className="flex bg-white  flex-col gap-4 p-3 relative"
      style={{ minHeight: "500px", boxShadow: '0px 0px 10px 0px #0000001A'
 }}
    >
<Editor
  ref={quillRef}
  readOnly={readOnly}
  defaultValue={data}   // ✅ send the prop here
  onSelectionChange={setRange}
  onTextChange={setLastChange}
/>


      {/* Update button */}
      <div className="flex justify-end  right-5 absolute top-5">
        <button
          style={{
            background: "#343F4F",
          }}
         
          className="px-5 py-1 text-white rounded-lg"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditSection;
