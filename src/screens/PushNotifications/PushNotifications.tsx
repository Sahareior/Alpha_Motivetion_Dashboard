import React, { useState } from "react";
import { Bell, Plus, CreditCard as Edit, Trash2, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { FaRegEdit } from "react-icons/fa";

interface Notification {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  user: string;
  status: "Active" | "Draft" | "Scheduled";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    name: "Morning Motivation",
    description: "Start your day with a motivational quote! Check out today's inspirational quote.",
    date: "2024-01-15",
    time: "08:00",
    user: "All Users",
    status: "Active"
  },
  {
    id: "2",
    name: "Premium Feature Highlight",
    description: "Discover new premium features available for premium users!",
    date: "2024-01-16",
    time: "14:00",
    user: "Premium Users",
    status: "Scheduled"
  },
  {
    id: "3",
    name: "Weekend Challenge",
    description: "Join our weekend challenge! Complete tasks to earn extra points this weekend.",
    date: "2024-01-20",
    time: "10:00",
    user: "All Users",
    status: "Draft"
  },
  {
    id: "4",
    name: "Upgrade Reminder",
    description: "Unlock premium features! Upgrade now to continue accessing premium features!",
    date: "2024-01-18",
    time: "16:00",
    user: "Free Users",
    status: "Scheduled"
  },
  {
    id: "5",
    name: "Upgrade Reminder",
    description: "Unlock premium features! Upgrade now to continue accessing premium features!",
    date: "2024-01-22",
    time: "12:00",
    user: "Free Users",
    status: "Draft"
  }
];

const StatusBadge = ({ status }: { status: Notification["status"] }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
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

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (notification: Omit<Notification, "id">) => void;
  notification?: Notification;
  title: string;
}

const NotificationModal = ({ isOpen, onClose, onSave, notification, title }: NotificationModalProps) => {
  const [formData, setFormData] = useState({
    name: notification?.name || "",
    description: notification?.description || "",
    date: notification?.date || "",
    time: notification?.time || "",
    user: notification?.user || "All Users",
    status: notification?.status || "Draft" as Notification["status"]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
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
              value={formData.user}
              onChange={(e) => handleChange("user", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All Users">All Users</option>
              <option value="Premium Users">Premium Users</option>
              <option value="Free Users">Free Users</option>
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
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | undefined>();

  const handleCreateNotification = (notificationData: Omit<Notification, "id">) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString()
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const handleEditNotification = (notificationData: Omit<Notification, "id">) => {
    if (editingNotification) {
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === editingNotification.id
            ? { ...notificationData, id: editingNotification.id }
            : notification
        )
      );
    }
    setEditingNotification(undefined);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const openEditModal = (notification: Notification) => {
    setEditingNotification(notification);
    setIsEditModalOpen(true);
  };

  return (
    <div className=" min-h-screen w-full">
      {/* Sidebar */}
            <div className="flex items-center justify-between ">
             <div className='mt-5 pb-5 mx-5'>
            <h2 className='text-[32px] font-semibold'>Push Notifications</h2>
   
</div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-[#343F4F] hover:bg-gray-900 text-white px-4 py-5 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Notification</span>
              </Button>
            </div>

      {/* Main Content */}
      <div className="">
        {/* Header */}


        {/* Push Notifications Card */}
        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-8">
            {/* Title and Create Button */}


            {/* Scheduled Section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Scheduled</h2>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id} className="bg-[#2a3441] border-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Bell className="w-5 h-5 text-gray-400" />
                            <h3 className="text-white font-medium">{notification.name}</h3>
                            <StatusBadge status={notification.status} />
                          </div>
                          <p className="text-gray-300 text-sm mb-3 ml-8">
                            {notification.description}
                          </p>
                          <div className="flex items-center space-x-4 ml-8 text-xs text-gray-400">
                            <span>{notification.date}</span>
                            <span>{notification.time}</span>
                            <span>{notification.user}</span>
                          </div>
                        </div>
                        
                        <div className="flex text-white items-center ">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(notification)}
                            className="h-8 w-8 p-0  hover:text-white hover:bg-gray-600"
                          >
                            <FaRegEdit  className="h-6 w-6" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="h-8 w-8 p-0  hover:text-red-400 hover:bg-gray-600"
                          >
                            <Trash2 className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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