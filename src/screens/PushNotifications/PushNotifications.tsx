import React, { useState, useEffect } from "react";
import { Bell, Plus, CreditCard as Edit, Trash2, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { FaCalendar, FaClock, FaRegEdit } from "react-icons/fa";
import { Toaster, toast } from 'sonner';
import {
  useGetAllNotificationQuery,
  useNotificationCreateMutation,
  useEditNotificationMutation,
  useNotificationDeleteMutation
} from '../../../store/slices/apiSlice.js'

interface Notification {
  id: string;
  title: string;
  descriptions: string;
  time: string;
  users: "all_user" | "premium" | "free";
  status?: "Active" | "Draft" | "Scheduled";
}

// Helper function to format date from ISO string to YYYY-MM-DD
const formatDate = (isoString: string): string => {
  return isoString.split('T')[0];
};

// Helper function to format time from ISO string to HH:MM
const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toTimeString().slice(0, 5);
};

// Helper function to create ISO string from date and time
const createISODateTime = (date: string, time: string): string => {
  return `${date}T${time}:00.000Z`;
};

const StatusBadge = ({ user }: { user: Notification["users"] }) => {
  const getStatusStyles = () => {
    switch (user) {
      case "premium":
        return "bg-green-100 text-green-800 border-green-200";
      case "all_user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "free":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDisplayText = () => {
    switch (user) {
      case "premium":
        return "Premium Users";
      case "all_user":
        return "All Users";
      case "free":
        return "Free Users";
      default:
        return user;
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyles()}`}>
      {getDisplayText()}
    </span>
  );
};

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (notification: Omit<Notification, "id">) => void;
  notification?: Notification;
  title: string;
}

const NotificationModal = ({ isOpen, onClose, onSave, notification, title }: NotificationModalProps) => {
  const [formData, setFormData] = useState({
    title: notification?.title || "",
    descriptions: notification?.descriptions || "",
    date: notification ? formatDate(notification.time) : "",
    time: notification ? formatTime(notification.time) : "",
    users: notification?.users || "all_user" as Notification["users"]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const notificationData: Omit<Notification, "id"> = {
      title: formData.title,
      descriptions: formData.descriptions,
      time: createISODateTime(formData.date, formData.time),
      users: formData.users
    };
    
    onSave(notificationData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset form when notification prop changes
  useEffect(() => {
    if (notification) {
      setFormData({
        title: notification.title,
        descriptions: notification.descriptions,
        date: formatDate(notification.time),
        time: formatTime(notification.time),
        users: notification.users
      });
    }
  }, [notification]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.descriptions}
              onChange={(e) => handleChange("descriptions", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User
            </label>
            <select
              value={formData.users}
              onChange={(e) => handleChange("users", e.target.value as Notification["users"])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all_user">All Users</option>
              <option value="premium">Premium Users</option>
              <option value="free">Free Users</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export const PushNotifications = (): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | undefined>();

  const { data: allNotifications, isLoading, error,refetch } = useGetAllNotificationQuery();
  const [notificationCreate, { isLoading: isCreating }] = useNotificationCreateMutation();
  const [editNotification, { isLoading: isEditing }] = useEditNotificationMutation();
  const [notificationDelete] = useNotificationDeleteMutation()


  console.log(allNotifications,'asasasa')

  // Update local state when API data changes
// Update local state when API data changes
useEffect(() => {
  if (allNotifications) {
    const formattedNotifications: Notification[] = allNotifications
      .map((notification: any) => ({
        id: notification.id.toString(),
        title: notification.title,
        descriptions: notification.descriptions,
        time: notification.time,
        users: notification.users
      }))
      // Sort by ID in descending order
      .sort((a, b) => parseInt(b.id) - parseInt(a.id));
    
    setNotifications(formattedNotifications);
  }
}, [allNotifications]);

  const handleCreateNotification = async (notificationData: Omit<Notification, "id">) => {
    try {
      const result = await notificationCreate(notificationData).unwrap();
      toast('Notification has been created successfully')
      refetch()
      // Add the new notification to local state
      const newNotification: Notification = {
        ...notificationData,
        id: result.id.toString() // Use the ID returned from the API
      };
      setNotifications(prev => [...prev, newNotification]);
    } catch (error) {
      console.error('Failed to create notification:', error);
      // Handle error (show toast, etc.)
    }
     refetch()
  };

  const handleEditNotification = async (notificationData: Omit<Notification, "id">) => {
    if (editingNotification) {
      try {
        await editNotification({
          id: editingNotification.id,
          data: notificationData
        }).unwrap();
toast("Notification has been edited successfully")
refetch()
        // Update local state
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === editingNotification.id
              ? { ...notificationData, id: editingNotification.id }
              : notification
          )
        );
      } catch (error) {
        console.error('Failed to edit notification:', error);
        // Handle error (show toast, etc.)
      }
    }
    setEditingNotification(undefined);
  };

  const handleDeleteNotification = async (id: string) => {
    // Note: You'll need a delete mutation if you want to delete from the backend
    const res = await notificationDelete(id).unwrap()
    console.log(res)
    if(res.detail === 'Deleted successfully'){
      toast("Notification deleted successfully")
    }
    refetch()
  };

  const openEditModal = (notification: Notification) => {
    setEditingNotification(notification);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-gray-600">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-red-600">Error loading notifications</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Toaster />
      <div className="flex items-center justify-between">
        <div className='mt-5 pb-5 mx-5'>
          <h2 className='text-[32px] font-semibold'>Push Notifications</h2>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#343F4F] hover:bg-gray-900 text-white px-4 py-5 rounded-lg flex items-center space-x-2"
          disabled={isCreating}
        >
          <Plus className="w-4 h-4" />
          <span>Create Notification</span>
        </Button>
      </div>

      <div className="">
        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-[24px] font-semibold mb-4 text-[#000000]">Scheduled</h2>
              
              <div className="space-y-4 h-[75vh] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No notifications found
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <Card key={notification.id} className="bg-[#2a3441] border-none">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Bell className="w-5 h-5 text-gray-400" />
                              <h3 className="text-white font-medium">{notification.title}</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-3 ml-8">
                              {notification.descriptions}
                            </p>
                            <div className="flex items-center space-x-4 ml-8 text-xs text-gray-400">
                              <span className="flex items-center gap-2">
                                <FaCalendar /> {formatDate(notification.time)}
                              </span>
                              <span className="flex items-center gap-2">
                                <FaClock /> {formatTime(notification.time)}
                              </span>
                              <StatusBadge user={notification.users} />
                            </div>
                          </div>
                          
                          <div className="flex text-white items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditModal(notification)}
                              className="h-8 w-8 p-0 hover:text-white hover:bg-gray-600"
                              disabled={isEditing}
                            >
                              <FaRegEdit className="h-10 w-10" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="h-8 w-8 p-0 hover:text-red-400 hover:bg-gray-600"
                            >
                              <Trash2 className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <NotificationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateNotification}
        title="Create Notification"
      />

      <NotificationModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingNotification(undefined);
        }}
        onSave={handleEditNotification}
        notification={editingNotification}
        title="Edit Notification"
      />
    </div>
  );
};