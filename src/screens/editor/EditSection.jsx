import React, { useRef, useState } from "react";
import Quill from "quill";
import Editor from "./Editor";
import Swal from "sweetalert2";
import { useGetPrivacyQuery, useGetTermsQuery, usePostPrivacyMutation, usePostTermsMutation } from "../../../store/slices/apiSlice";

const EditSection = ({ data, section }) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [postPrivacy, { isLoading: isPrivacyLoading }] = usePostPrivacyMutation();
  const [postTerms, { isLoading: isTermsLoading }] = usePostTermsMutation();
    const {data: privacy, refetch:privacyRefetch} = useGetPrivacyQuery()
    const {data:terms,refetch:termsRefetch} = useGetTermsQuery()

  const quillRef = useRef(null);

  // Extract the actual content from the API response
  const getContentFromData = () => {
    if (!data) return "";
    
    // If data has a 'text' property, use that
    if (typeof data === 'object' && data.text) {
      return data.text;
    }
    
    // If data is already a string, use it directly
    if (typeof data === 'string') {
      return data;
    }
    
    return "";
  };

  const handleUpdate = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#343F4F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Get the updated content from Quill editor
          const content = quillRef.current?.root.innerHTML || "";
          
          // Prepare the data payload
          const payload = { text: content };
          
          // Conditionally use the appropriate mutation based on section
          let result;
          if (section === "terms") {
            result = await postTerms(payload).unwrap();
            termsRefetch()
          } else {
            result = await postPrivacy(payload).unwrap();
            privacyRefetch()
          }

          // Show success message
          Swal.fire({
            position: "top center",
            icon: "success",
            title: "Content updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          
        } catch (error) {
          // Handle error
          console.error("Update failed:", error);
          Swal.fire({
            position: "top center",
            icon: "error",
            title: "Update failed!",
            text: "There was an error updating the content. Please try again.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const isLoading = section === "terms" ? isTermsLoading : isPrivacyLoading;

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
        readOnly={readOnly || isLoading}
        defaultValue={getContentFromData()} // Use the extracted content
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

      {/* Update button */}
      <div className="flex justify-end right-5 absolute top-5">
        <button
          style={{ background: "#343F4F" }}
          onClick={handleUpdate}
          disabled={isLoading}
          className="px-5 py-1 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default EditSection;