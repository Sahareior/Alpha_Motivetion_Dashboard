import React, { useState } from "react";
import { FaAward, FaEdit, FaRegEdit, FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import CommonModal from "./Modal/CommonModal";
import Leaderboard from "./CommonTabel";
import { AiOutlineMenu } from "react-icons/ai";
import { Toaster, toast } from 'sonner';
import TableSection from "./CommonTabel";
import Swal from "sweetalert2";
import {useGetBadgesQuery,useCreateBadgesMutation,useEditBadgesMutation} from '../../../store/slices/apiSlice.js'

const Overview = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const {data:allbadges, refetch} = useGetBadgesQuery()
  const [createBadges] = useCreateBadgesMutation()
  const [editBadges] = useEditBadgesMutation ()


  console.log(editingItem,'badges')



  const handleEditBadge = (badge) => {
    console.log(badge, "this is badge");
    setModalType("badge-edit");
    setModalTitle("Edit Badge");
    setEditingItem(badge);
    setModalOpen(true);
  };



const handleSave = async (data) => {
  try {
    switch (modalType) {
      case "badge-create":
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('points_required', data.points);
        formData.append('level_required', data.level);
        
        if (data.icon instanceof File) {
          formData.append('image', data.icon);
        }
        
        const res = await createBadges(formData);
        break;
        
      case "badge-edit":
        const editFormData = new FormData();
        editFormData.append('name', data.name);
        editFormData.append('description', data.description);
        editFormData.append('points_required', data.points);
        editFormData.append('level_required', data.level);
        
        if (data.icon instanceof File) {
          editFormData.append('image', data.icon);
        }
        
        const response = await editBadges({
          id: editingItem?.id, 
          data: editFormData
        });
             toast('Badge updated successfully!')
        refetch()
        break;
        
      default:
        break;
    }
    
    // Close modal on success
    setModalOpen(false);
    setEditingItem(null);
    
  } catch (error) {
    console.error('Error saving badge:', error);
  }
};

console.log(allbadges,'allbadges')



const MotivetionCard = ({ item, type, onEdit }) => (
  <div className="bg-[#343F4F] rounded-xl text-white p-4">
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <img
          className="w-6 h-6 rounded-full"
          // src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          src={item.image || "https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt=""
        />
        <h2>{item.name}</h2>
      </div>
  <div className="flex items-center gap-4">
        <FaRegEdit
        size={18} 
          className="text-white cursor-pointer"
          onClick={() => onEdit(item)}
        />
      
      </div>
    </div>
    <p className="mt-2 w-[80%] text-start">{item.description}</p>
  </div>
);

  return (
    <div>
      <Toaster />
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

        </div>
        <div className="grid grid-cols-5 mt-5 gap-4">
           {allbadges?.map((badge) => (
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
 
      <div>
        <TableSection type="leaderboard" />

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