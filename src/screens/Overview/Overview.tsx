import React, { useState } from "react";
import { FaAward, FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import CommonModal from "./Modal/CommonModal";
import Leaderboard from "./CommonTabel";
import { AiOutlineMenu } from "react-icons/ai";

const Overview = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const handleCreateBadge = () => {
    setModalType("badge-create");
    setModalTitle("Create New Badge");
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEditBadge = (badge) => {
    console.log(badge, "this is badge");
    setModalType("badge-edit");
    setModalTitle("Edit Badge");
    setEditingItem(badge);
    setModalOpen(true);
  };

  const handleCreateCategory = () => {
    setModalType("category-create");
    setModalTitle("Create New Category");
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setModalType("category-edit");
    setModalTitle("Edit Category");
    setEditingItem(category);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    console.log("Saving data:", data);
    console.log("Operation type:", modalType);
    console.log("Editing item:", editingItem);

    // Handle save logic based on modalType
    switch (modalType) {
      case "badge-create":
        // Create new badge
        break;
      case "badge-edit":
        // Update existing badge
        break;
      case "category-create":
        // Create new category
        break;
      case "category-edit":
        // Update existing category
        break;
      default:
        break;
    }
  };


  const badges = [
  { id: 1, name: "Lone Wolf", description: "Awarded for solo achievements" },
  { id: 2, name: "Team Player", description: "For excellent teamwork" },
  { id: 3, name: "High Scorer", description: "Top scoring badge" },
  { id: 4, name: "Rising Star", description: "Newcomer with outstanding performance" },
  { id: 5, name: "Veteran", description: "Long-term consistent performance" },
  { id: 6, name: "Innovator", description: "For creative contributions" },
];

const categories = [
  { id: 1, name: "Beginner", description: "Suitable for new users" },
  { id: 2, name: "Intermediate", description: "For regular users" },
  { id: 3, name: "Advanced", description: "For experienced users" },
  { id: 4, name: "Expert", description: "Top tier users" },
  { id: 5, name: "Master", description: "Elite users only" },
];

const MotivetionCard = ({ item, type, onEdit }) => (
  <div className="bg-[#343F4F] rounded-xl text-white p-4">
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <img
          className="w-4 h-4 rounded-full"
          src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h2>{item.name}</h2>
      </div>
      <div className="flex items-center gap-4">
        <FiEdit3
          className="text-white cursor-pointer"
          onClick={() => onEdit(item)}
        />
        <FaTrash className="text-white cursor-pointer" />
      </div>
    </div>
    <p className="mt-2 w-[80%] text-start">{item.description}</p>
  </div>
);

  return (
    <div>
      <div className="mt-5 pb-7 mx-5">
        <h3 className="text-3xl font-semibold">Gamification Overview</h3>
      </div>

      {/* Badges Section */}
      <div
        className="p-6 text-center rounded-md"
        style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}
      >
        <div className="flex justify-between">
          <h3 className="text-[24px] font-semibold text-[#000000]">
            Badges & overview
          </h3>
          <button
            onClick={handleCreateBadge}
            className="bg-[#343F4F] flex items-center gap-3 text-white px-5 py-2 rounded-[10px]"
          >
            <FaAward size={18} /> Create new Badge
          </button>
        </div>
        <div className="grid grid-cols-5 mt-5 gap-4">
           {badges.map((badge) => (
    <MotivetionCard
      key={badge.id}
      item={badge}
      type="badge"
      onEdit={handleEditBadge}
    />
  ))}
        </div>
      </div>

      {/* Categories Section */}
      <div
        className="p-6 text-center mt-5 rounded-md"
        style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}
      >
        <div className="flex justify-between">
          <h3 className="text-[24px] font-semibold text-[#000000]">
            Category Management
          </h3>
          <button
            onClick={handleCreateCategory}
            className="bg-[#343F4F] flex items-center gap-3 text-white px-5 py-2 rounded-[10px]"
          >
            <AiOutlineMenu size={18} /> Create New Category
          </button>
        </div>
        <div className="grid grid-cols-5 mt-5 gap-4">
  {categories.map((category) => (
    <MotivetionCard
      key={category.id}
      item={category}
      type="category"
      onEdit={handleEditCategory}
    />
  ))}
        </div>
      </div>
      <div>
        <Leaderboard />
      </div>
      {/* Reusable Modal */}
      <CommonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        title={modalTitle}
        type={modalType}
        initialData={editingItem || {}}
      />
    </div>
  );
};

export default Overview;
