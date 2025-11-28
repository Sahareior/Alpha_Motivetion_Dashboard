import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CommonModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  type,
  data,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    cost: "",
    points: "",
    level: "",
    feature: "",
    icon: "",
    ...initialData
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const mappedData = initialData ? {
        name: initialData.name || "",
        description: initialData.description || "",
        points: initialData.points_required || "",
        level: initialData.level_required || "",
        icon: initialData.image,
        existingImage: initialData.image
      } : {
        name: "",
        description: "",
        points: "",
        level: "",
        icon: ""
      };
      
      setFormData(mappedData);
      
      // Set initial image preview if existing image is available
      if (initialData?.image) {
        setImagePreview(initialData.image);
      } else {
        setImagePreview(null);
      }
    }
  }, [initialData, isOpen]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange('icon', file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // If no file selected, reset to existing image or null
      setImagePreview(formData.existingImage || null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    // Don't close modal here - let the parent handle it after API call
  };

  if (!isOpen) return null;

  const getFieldConfig = () => {
    switch(type) {
      case 'badge-create':
      case 'badge-edit':
        return [
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Enter badge name"
          },
          {
            name: "points",
            label: "Points",
            type: "text",
            placeholder: "Enter badge points"
          },
          {
            name: "description", 
            label: "Description",
            type: "textarea",
            placeholder: "Enter badge description",
            rows: 3
          },
          {
            name: "icon",
            label: "Icon",
            type: "file"
          }
        ];
      
      case 'category-create':
      case 'category-edit':
        return [
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Enter category name"
          },
          {
            name: "description", 
            label: "Description",
            type: "textarea",
            placeholder: "Enter category description",
            rows: 3
          },
          {
            name: "icon",
            label: "Icon",
            type: "file"
          }
        ];

      case "edit-profile":
        return [
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: data?.first_name
          },
          {
            name: "icon",
            label: "Profile Photo",
            type: "file"
          }
        ];
      
      default:
        return [];
    }
  };

  const fields = getFieldConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Preview */}
          {imagePreview && (
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                />
              </div>
            </div>
          )}

          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xl font-medium text-gray-700 mb-2">
                {field.label}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={field.rows || 3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              )}

              {field.type === "file" && (
                <div className="w-full">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full text-sm text-gray-500 border border-black rounded-md 
                             file:mr-4 file:py-2 file:px-4 file:rounded-md file:text-sm 
                             file:font-semibold file:bg-[#343F4F] file:text-white 
                             hover:cursor-pointer"
                  />
                  {formData.icon && (
                    <p className="text-sm text-gray-600 mt-1 hover:cursor-pointer">
                      Selected: {formData.icon.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md"
            >
              {type.includes('edit') ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommonModal;