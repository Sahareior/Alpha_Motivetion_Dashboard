import React, { useState } from "react";
import { MoveHorizontal as MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiTrash2, FiUserCheck, FiUserX } from "react-icons/fi";
import Swal from "sweetalert2";

interface User {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Suspended";
  type: "Premium" | "Free";
  joinDate: string;
  lastActive: string;
  level: number;
  avatar: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    status: "Active",
    type: "Premium",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
    level: 15,
    avatar: "JD"
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah.smith@email.com",
    status: "Active",
    type: "Premium",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 12,
    avatar: "SS"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@email.com",
    status: "Inactive",
    type: "Free",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 11,
    avatar: "MJ"
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    status: "Active",
    type: "Premium",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 10,
    avatar: "EW"
  },
  {
    id: "5",
    name: "Michael Johnson",
    email: "michael.johnson2@email.com",
    status: "Inactive",
    type: "Free",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 11,
    avatar: "MJ"
  },
  {
    id: "6",
    name: "Emma Wilson",
    email: "emma.wilson2@email.com",
    status: "Active",
    type: "Premium",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 8,
    avatar: "EW"
  },
  {
    id: "7",
    name: "Michael Johnson",
    email: "michael.johnson3@email.com",
    status: "Suspended",
    type: "Free",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 5,
    avatar: "MJ"
  },
  {
    id: "8",
    name: "Emma Wilson",
    email: "emma.wilson3@email.com",
    status: "Active",
    type: "Premium",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 15,
    avatar: "EW"
  },
  {
    id: "9",
    name: "Michael Johnson",
    email: "michael.johnson4@email.com",
    status: "Inactive",
    type: "Free",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 11,
    avatar: "MJ"
  },
  {
    id: "10",
    name: "Emma Wilson",
    email: "emma.wilson4@email.com",
    status: "Active",
    type: "Premium",
    joinDate: "2023-05-16",
    lastActive: "2023-07-25",
    level: 16,
    avatar: "EW"
  }
];

const StatusBadge = ({ status }: { status: User["status"] }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const TypeBadge = ({ type }: { type: User["type"] }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
      type === "Premium" 
        ? "bg-blue-100 text-blue-800 border border-blue-200" 
        : "bg-gray-100 text-gray-800 border border-gray-200"
    }`}>
      {type}
    </span>
  );
};

const ActionMenu = ({
  onAction,
  handelAlert
}: { onAction: (action: string) => void, handelAlert: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="relative inline-block text-left">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="h-8 w-8 p-0"
      >
        <BsThreeDotsVertical className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* Overlay for outside click - placed BEHIND the menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu with higher z-index */}
          <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg border border-gray-200 z-50">
            <div className="py-1 bg-[#343F4F] rounded-md flex flex-col">
              {/* Suspend */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handelAlert()
                  onAction("suspend");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-600 transition-colors duration-200"
              >
                <FiUserX className="text-yellow-400" size={18} />
                Suspend Account
              </button>

              {/* Activate */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handelAlert()
                  onAction("activate");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-600 transition-colors duration-200"
              >
                <FiUserCheck className="text-green-400" size={18} />
                Activate Account
              </button>

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handelAlert()
                  onAction("delete");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-600 transition-colors duration-200"
              >
                <FiTrash2 className="text-red-500" size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export const UserManagement = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(mockUsers.length / usersPerPage);

  const handleAction = (userId: string, action: string) => {
    console.log(`Action ${action} for user ${userId}`);
  };

  const handelAlert =()=>{
        Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }

  return (
    <div className="min-h-screen w-full">
      {/* Main Content */}
      <div className="">
      <div className='mt-5 pb-5 mx-5'>
            <h2 className='text-[32px] font-semibold'>User Management</h2>
      
</div>
        <Card className="">
          <CardContent className="p-8">
            
            <div className="mb-6">
              <h2 className="text-[24px] font-semibold text-[#000000] mb-5">Users</h2>
              
              {/* Table */}
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-[#343F4F]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-gray-700">
                                {user.avatar}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <TypeBadge type={user.type} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.level}
                        </td>
                       <td className="px-6 py-4 whitespace-nowrap relative">
  <ActionMenu 
  onAction={(action) => handleAction(user.id, action)} 
  handelAlert={handelAlert} 
/>

</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Showing 1 to 10 of 10 users
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="h-8 w-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};