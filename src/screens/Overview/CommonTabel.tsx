"use client";

import { useState } from "react";

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  level: number;
  points: number;
  badges: number;
  streak: number;
}

interface PlanUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  avatar: string;
  date: string;
  amount: string;
  status: "completed" | "failed";
  paymentMethod: string;
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    rank: 1,
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    level: 25,
    points: 1500,
    badges: 5,
    streak: 45,
  },
  {
    id: "2",
    rank: 2,
    name: "Sarah Smith",
    avatar:
      "https://images.unsplash.com/photo-1692035053253-c40149437b5f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    level: 24,
    points: 1400,
    badges: 5,
    streak: 50,
  },
  {
    id: "3",
    rank: 3,
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    level: 25,
    points: 1500,
    badges: 5,
    streak: 45,
  },
  {
    id: "4",
    rank: 4,
    name: "Sarah Smith",
    avatar:
      "https://images.unsplash.com/photo-1692035053253-c40149437b5f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    level: 24,
    points: 1400,
    badges: 5,
    streak: 50,
  },
];

const mockPlans: PlanUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plan: "Monthly Premium",
    date: "2023-06-15",
    amount: "$4.99",
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "Yearly Premium",

    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2023-06-15",
    amount: "$39.99",
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "One-time Premium",
    date: "2023-06-15",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amount: "$89.99",
    status: "failed",
    paymentMethod: "Credit Card",
  },
];

export default function TableSection({
  type = "leaderboard",
}: {
  type?: "leaderboard" | "plan";
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(
    type === "plan" ? mockPlans : mockLeaderboard
  );
  const usersPerPage = 10;
  const totalUsers = data.length;

  const handleDelete = (userId: string) => {
    setData(data.filter((user: any) => user.id !== userId));
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = Math.min(startIndex + usersPerPage, totalUsers);
  const currentUsers = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div
      className="w-full mt-6 rounded-md mx-auto p-6"
      style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}
    >
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
                ? (currentUsers as PlanUser[]).map((user, index) => (
                    <tr
                      key={user.id}
                      className={`border-b font-bold border-border ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 flex items-center gap-2 py-3 text-foreground font-medium">
                                 <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{user.plan}</td>
                      <td className="px-4 py-3">{user.date}</td>
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
                      <td className="px-4 py-3">{user.paymentMethod}</td>
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
                : (currentUsers as LeaderboardUser[]).map((user, index) => (
                    <tr
                      key={user.id}
                      className={`border-b font-bold border-border ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 py-3">{user.rank}</td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                        {user.name}
                      </td>
                      <td className="px-4 py-3">{user.level}</td>
                      <td className="px-4 py-3">
                        {user.points.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{user.badges}</td>
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
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-border">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {endIndex} of {totalUsers} users
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-8 w-8 flex items-center justify-center text-sm rounded transition-colors ${
                  currentPage === i + 1
                    ? "bg-[#343F4F] text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="h-8 w-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
