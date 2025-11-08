"use client";

import { useState, useEffect } from "react";
import { 
  useDashLeaderBoardQuery, 
  useLeaderBoardDeleteMutation, 
  useGetPlansQuery ,
  useDashPaymentDeleteMutation
} from '../../../store/slices/apiSlice.js'
import Swal from "sweetalert2";
import { Toaster, toast } from 'sonner';

interface LeaderboardUser {
  id: string;
  rank: number;
  first_name: string;
  profile_photo: string | null;
  points: number;
  total_badges: number;
  streak: number;
}

interface PlanUser {
  id: string;
  first_name: string;
  profile_photo: string | null;
  email: string;
  plan: string;
  status: "completed" | "failed";
  amount: string;
  payment_method: string;
  created_at: string;
}

interface LeaderboardApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LeaderboardUser[];
  current_page?: number;
  total_pages?: number;
}

interface PlansApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanUser[];
  current_page?: number;
  total_pages?: number;
}

// Default avatar for users without profile photos
const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Helper function to format date
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to format plan name
const formatPlanName = (plan: string): string => {
  const planMap: { [key: string]: string } = {
    'monthly': 'Monthly Premium',
    'yearly': 'Yearly Premium',
    'one_time': 'One-time Premium',
    'free': 'Free Plan'
  };
  return planMap[plan] || plan;
};

// Helper function to format payment method
const formatPaymentMethod = (method: string): string => {
  const methodMap: { [key: string]: string } = {
    'stripe': 'Stripe',
    'paypal': 'PayPal',
    'credit_card': 'Credit Card',
    'debit_card': 'Debit Card'
  };
  return methodMap[method] || method;
};

// Generate page numbers with ellipsis logic
const generatePageNumbers = (currentPage: number, totalPages: number) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages <= maxVisiblePages) {
    // Show all pages if total pages is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're at the beginning
    if (currentPage <= 3) {
      endPage = 4;
    }
    
    // Adjust if we're at the end
    if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  }
  
  return pages;
};

export default function TableSection({
  type = "leaderboard",
}: {
  type?: "leaderboard" | "plan";
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<LeaderboardUser[] | PlanUser[]>([]);
  const [dashPaymentDelete] = useDashPaymentDeleteMutation()
  const [leaderBoardDelete] = useLeaderBoardDeleteMutation()

  // Use the query hooks with pagination parameters
  const { 
    data: dashleaderboard, 
    isLoading: leaderboardLoading, 
    refetch: refetchLeaderboard,
    error: leaderboardError 
  } = useDashLeaderBoardQuery({
    page: currentPage,
    page_size: pageSize
  });

  const { 
    data: allPlans, 
    isLoading: plansLoading, 
    refetch: refetchPlans,
    error: plansError 
  } = useGetPlansQuery({
    page: currentPage,
    page_size: pageSize
  });

  // Update local state when API data changes
  useEffect(() => {
    if (type === "leaderboard" && dashleaderboard) {
      const apiData = dashleaderboard as LeaderboardApiResponse;
      
      // Transform API data to match our component structure
      const transformedData: LeaderboardUser[] = apiData.results.map((user, index) => ({
        id: user.id,
        rank: user.rank,
        first_name: user.first_name || "Anonymous",
        profile_photo: user.profile_photo,
        points: user.points,
        total_badges: user.total_badges,
        streak: user.streak
      }));
      
      setData(transformedData);
    } else if (type === "plan" && allPlans) {
      const apiData = allPlans as PlansApiResponse;
      
      // Transform API data to match our component structure
      const transformedData: PlanUser[] = apiData.results.map((plan, index) => ({
        id: plan.id,
        first_name: plan.first_name || "User",
        profile_photo: plan.profile_photo,
        email: plan.email,
        plan: plan.plan,
        status: plan.status,
        amount: `$${plan.amount}`,
        payment_method: plan.payment_method,
        created_at: plan.created_at
      }));
      
      setData(transformedData);
    }
  }, [dashleaderboard, allPlans, type]);

  const handleDelete = async (userId: string) => {
    console.log(userId, "this is userId");
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (type === "plan") {
            await dashPaymentDelete(userId);
            toast('Deleted Successfully')
            refetchPlans()
          }
          else if (type === 'leaderboard'){
            await leaderBoardDelete(userId)
            toast('Deleted Successfully')
            refetchLeaderboard()
          }

          Swal.fire({
            title: "Deleted!",
            text: "The record has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#16a34a",
          });
        } catch (error) {
          console.error("Delete failed:", error);

          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting the record.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };

  // Calculate pagination info based on API response
  const getPaginationInfo = () => {
    if (type === "leaderboard" && dashleaderboard) {
      const apiData = dashleaderboard as LeaderboardApiResponse;
      const totalUsers = apiData.count;
      const totalPages = apiData.total_pages || Math.ceil(totalUsers / pageSize);
      const currentPageFromApi = apiData.current_page || currentPage;
      const startIndex = ((currentPageFromApi - 1) * pageSize) + 1;
      const endIndex = Math.min(currentPageFromApi * pageSize, totalUsers);
      
      return {
        totalUsers,
        startIndex,
        endIndex,
        totalPages,
        currentPage: currentPageFromApi,
        hasNext: !!apiData.next,
        hasPrevious: !!apiData.previous
      };
    } else if (type === "plan" && allPlans) {
      const apiData = allPlans as PlansApiResponse;
      const totalUsers = apiData.count;
      const totalPages = apiData.total_pages || Math.ceil(totalUsers / pageSize);
      const currentPageFromApi = apiData.current_page || currentPage;
      const startIndex = ((currentPageFromApi - 1) * pageSize) + 1;
      const endIndex = Math.min(currentPageFromApi * pageSize, totalUsers);
      
      return {
        totalUsers,
        startIndex,
        endIndex,
        totalPages,
        currentPage: currentPageFromApi,
        hasNext: !!apiData.next,
        hasPrevious: !!apiData.previous
      };
    } else {
      // Fallback for when no API data
      const totalUsers = data.length;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalUsers);
      const totalPages = Math.ceil(totalUsers / pageSize);
      
      return {
        totalUsers,
        startIndex: startIndex + 1,
        endIndex,
        totalPages,
        currentPage,
        hasNext: currentPage < totalPages,
        hasPrevious: currentPage > 1
      };
    }
  };

  const { totalUsers, startIndex, endIndex, totalPages, currentPage: currentPageFromApi, hasNext, hasPrevious } = getPaginationInfo();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Generate page numbers for pagination
  const pageNumbers = generatePageNumbers(currentPageFromApi, totalPages);

  // Determine loading and error states based on type
  const isLoading = type === "leaderboard" ? leaderboardLoading : plansLoading;
  const error = type === "leaderboard" ? leaderboardError : plansError;

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full mt-6 rounded-md mx-auto p-6" style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}>
        <h1 className="text-2xl font-bold text-foreground mb-6">
          {type === "plan" ? "Plans & Payments" : "Leaderboard"}
        </h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full mt-6 rounded-md mx-auto p-6" style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}>
        <h1 className="text-2xl font-bold text-foreground mb-6">
          {type === "plan" ? "Plans & Payments" : "Leaderboard"}
        </h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-red-600">Error loading data</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full mt-6 rounded-md mx-auto p-6"
      style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}
    >
      <Toaster />
      <h1 className="text-2xl font-bold text-foreground mb-6">
        {type === "plan" ? "Plans & Payments" : "Leaderboard"}
      </h1>

      <div className="bg-background rounded-lg border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {type === "plan" ? (
                <tr className="bg-slate-700 text-[20px] text-white">
                  <th className="px-4 py-3 text-left font-normal">User</th>
                  <th className="px-4 py-3 text-left font-normal">Plan</th>
                  <th className="px-4 py-3 text-left font-normal">Date</th>
                  <th className="px-4 py-3 text-left font-normal">Amount</th>
                  <th className="px-4 py-3 text-left font-normal">Status</th>
                  <th className="px-4 py-3 text-left font-normal">
                    Payment Method
                  </th>
                  <th className="px-4 py-3 text-left font-normal">Actions</th>
                </tr>
              ) : (
                <tr className="bg-slate-700 text-[20px] text-white">
                  <th className="px-4 py-3 text-left font-normal">Rank</th>
                  <th className="px-4 py-3 text-left font-normal">User</th>
                  <th className="px-4 py-3 text-left font-normal">Level</th>
                  <th className="px-4 py-3 text-left font-normal">Points</th>
                  <th className="px-4 py-3 text-left font-normal">Badges</th>
                  <th className="px-4 py-3 text-left font-normal">Streak</th>
                  <th className="px-4 py-3 text-left font-normal">Actions</th>
                </tr>
              )}
            </thead>

            <tbody>
              {type === "plan"
                ? (data as PlanUser[]).map((user, index) => (
                    <tr
                      key={user.id}
                      className={`border-b font-bold border-border ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 flex items-center gap-2 py-3 text-foreground font-medium">
                        <img
                          src={user.profile_photo || defaultAvatar}
                          alt={user.first_name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <div className="font-bold">{user.first_name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{formatPlanName(user.plan)}</td>
                      <td className="px-4 py-3">{formatDate(user.created_at)}</td>
                      <td className="px-4 py-3">{user.amount}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            user.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{formatPaymentMethod(user.payment_method)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-4 py-1 text-sm font-medium text-white bg-[#AC2927] hover:bg-red-700 rounded-xl transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : (data as LeaderboardUser[]).map((user, index) => (
                    <tr
                      key={user.id}
                      className={`border-b font-bold border-border ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 py-3">{user.rank}</td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <img
                          src={user.profile_photo || defaultAvatar}
                          alt={user.first_name}
                          className="h-8 w-8 rounded-full"
                        />
                        {user.first_name}
                      </td>
                      <td className="px-4 py-3">-</td> {/* Level not provided by API */}
                      <td className="px-4 py-3">
                        {user.points.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{user.total_badges}</td>
                      <td className="px-4 py-3">{user.streak} days</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-4 py-1 text-sm font-medium text-white bg-[#AC2927] hover:bg-red-700 rounded-xl transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-border">
            <div className="text-sm text-gray-600">
              {/* Showing {startIndex} to {endIndex} of {totalUsers} {type === "plan" ? "payments" : "users"} */}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPageFromApi - 1)}
                disabled={!hasPrevious}
                className="h-8 w-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              
              {pageNumbers.map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={page === '...'}
                  className={`h-8 w-8 flex items-center justify-center text-sm rounded transition-colors ${
                    page === '...' 
                      ? 'cursor-default border-transparent' 
                      : currentPageFromApi === page
                        ? "bg-[#343F4F] text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPageFromApi + 1)}
                disabled={!hasNext}
                className="h-8 w-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}