import React, { useRef, useState } from "react";
import Quill from "quill";
import Editor from "./Editor";
import Swal from "sweetalert2";

const EditSection = ({ data }) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const quillRef = useRef(null);

  const handleUpdate = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#343F4F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // 👉 here you can handle the actual update logic
        Swal.fire({
          position: "top center",
          icon: "success",
          title: "Content updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div
      className="flex bg-white flex-col gap-4 p-3 relative"
      style={{
        minHeight: "500px",
        boxShadow: "0px 0px 10px 0px #0000001A",
      }}
    >
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={data}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

      {/* Update button */}
      <div className="flex justify-end right-5 absolute top-5">
        <button
          style={{ background: "#343F4F" }}
          onClick={handleUpdate}
          className="px-5 py-1 text-white rounded-lg"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditSection;
