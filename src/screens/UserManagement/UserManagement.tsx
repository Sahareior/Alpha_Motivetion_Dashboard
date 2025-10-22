import React, { useState } from "react";
import { MoveHorizontal as MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiTrash2, FiUserCheck, FiUserX, FiEdit } from "react-icons/fi";
import { Toaster, toast } from 'sonner';
import Swal from "sweetalert2";
import { useUserListsQuery,useUpdatePlanTypeMutation,useLazySuspendUserQuery,useDeleteDashUserMutation,useLazyReactiveUserQuery } from "../../../store/slices/apiSlice.js";

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

interface ApiUser {
  id: number;
  first_name: string;
  email: string;
  profile_photo: string | null;
  is_active: boolean;
  type: "Premium" | "Free";
  join_date: string;
  last_activity: string | null;
  level: number;
}

interface ApiResponse {
  count: number;
  total_pages: number;
  current_page: number;
  results: ApiUser[];
}

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

// New Subscription Type Dropdown Component
const SubscriptionDropdown = ({
  currentType,
  userId,
  onUpdate,
  handelAlert
}: {
  currentType: User["type"];
  userId: string;
  onUpdate: () => void;
  handelAlert: (message: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatePlanType] = useUpdatePlanTypeMutation();

  const subscriptionTypes = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
    { value: "lifetime", label: "Lifetime" }
  ];

  const handleSubscriptionChange = async (subscriptionType: string) => {
    try {
      await updatePlanType({
        subscription_type: subscriptionType,
        user_id: parseInt(userId)
      }).unwrap();

      handelAlert(`Subscription updated to ${subscriptionType}`);
      onUpdate();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update subscription:", error);
      handelAlert("Failed to update subscription");
    }
  };

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
        <FiEdit className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg border border-gray-200 z-50 bg-[#343F4F]">
            <div className="py-1 rounded-md flex flex-col">
              <div className="px-3 py-2 text-xs text-gray-300 border-b border-gray-600">
                Change Plan
              </div>
              {subscriptionTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscriptionChange(type.value);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-600 transition-colors duration-200"
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ActionMenu = ({
  onAction,
  handelAlert,
  userId,
  refetch
}: { 
  onAction: (action: string) => void; 
  handelAlert: (message: string) => void;
  userId: string; 
  refetch: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suspendUser] = useLazySuspendUserQuery();
  const [reactiveUser] = useLazyReactiveUserQuery();
  const [deleteDashUser] = useDeleteDashUserMutation();

  const handleSuspend = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await suspendUser(userId).unwrap();
      handelAlert("User is Suspended!");
      onAction("suspend");
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to suspend user:", error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to suspend user",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleActive = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await reactiveUser(userId).unwrap();
      handelAlert('User Activated Successfully');
      onAction("activate");
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to active user:", error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to activate user",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handelDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteDashUser(userId).unwrap();
      handelAlert('User deleted successfully');
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
      handelAlert("Failed to delete user");
    }
  };

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
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg border border-gray-200 z-50 bg-[#343F4F]">
            <div className="py-1 rounded-md flex flex-col">
              <button
                onClick={handleSuspend}
                className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-600 transition-colors duration-200"
              >
                <FiUserX className="text-yellow-400" size={18} />
                Suspend Account
              </button>

              <button
                onClick={handleActive}
                className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-600 transition-colors duration-200"
              >
                <FiUserCheck className="text-green-400" size={18} />
                Activate Account
              </button>

              <button
                onClick={handelDelete}
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

const transformApiUserToUser = (apiUser: ApiUser): User => {
  const getAvatar = (firstName: string, email: string): string => {
    if (firstName && firstName.trim() !== "" && firstName !== "string") {
      return firstName.substring(0, 2).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const getStatus = (isActive: boolean, lastActivity: string | null): User["status"] => {
    if (!isActive) return "Suspended";
    if (!lastActivity) return "Inactive";
    return "Active";
  };

  return {
    id: apiUser.id.toString(),
    name: apiUser.first_name && apiUser.first_name.trim() !== "" && apiUser.first_name !== "string" 
      ? apiUser.first_name 
      : apiUser.email.split('@')[0],
    email: apiUser.email,
    status: getStatus(apiUser.is_active, apiUser.last_activity),
    type: apiUser.type,
    joinDate: apiUser.join_date.split(' ')[0], 
    lastActive: apiUser.last_activity ? apiUser.last_activity.split(' ')[0] : "Never",
    level: apiUser.level,
    avatar: getAvatar(apiUser.first_name, apiUser.email)
  };
};

export const UserManagement = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const { data: apiResponse, isLoading, error, refetch } = useUserListsQuery();

  const users: User[] = apiResponse?.results 
    ? apiResponse.results.map(transformApiUserToUser)
    : [];
  
  const totalPages = apiResponse?.total_pages || 1;
  const totalUsers = apiResponse?.count || 0;

  const handleAction = (userId: string, action: string) => {
    console.log(`Action ${action} for user ${userId}`);
  };

  const handelAlert = (text: string) => {
    toast(text);
  };

  const handleSubscriptionUpdate = () => {
    refetch(); // Refresh the user list after subscription update
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-lg text-red-500">Error loading users</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Toaster />
      {/* Main Content */}
      <div className="">
        <div className='mt-5 pb-5 mx-5'>
          <h2 className='text-[32px] font-semibold'>User Management</h2>
        </div>
        <Card className="">
          <CardContent className="p-8">
            
            <div className="mb-6">
              <h2 className="text-[24px] font-semibold text-[#000000] mb-5">Users</h2>
              
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <div className="min-h-[50vh] overflow-auto">
                  <table className="w-full relative">
                    <thead className="bg-[#343F4F] sticky top-0 z-10">
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
                      {currentUsers.map((user) => (
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
                            <div className="flex items-center gap-2">
                              <TypeBadge type={user.type} />
                              <SubscriptionDropdown
                                currentType={user.type}
                                userId={user.id}
                                onUpdate={handleSubscriptionUpdate}
                                handelAlert={handelAlert}
                              />
                            </div>
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
                              refetch={refetch}
                              handelAlert={handelAlert} 
                              userId={user.id}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, totalUsers)} of {totalUsers} users
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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