"use client"

import { useState } from "react"

interface LeaderboardUser {
  id: string
  rank: number
  name: string
  avatar: string
  level: number
  points: number
  badges: number
  streak: number
}

const mockUsers: LeaderboardUser[] = [
  {
    id: "1",
    rank: 1,
    name: "John Doe",
    avatar: "/abstract-profile.png",
    level: 25,
    points: 1500,
    badges: 5,
    streak: 45,
  },
  {
    id: "2",
    rank: 2,
    name: "Sarah Smith",
    avatar: "/abstract-profile.png",
    level: 24,
    points: 1400,
    badges: 5,
    streak: 50,
  },
  {
    id: "3",
    rank: 3,
    name: "Michael Johnson",
    avatar: "/abstract-profile.png",
    level: 23,
    points: 1300,
    badges: 4,
    streak: 30,
  },
  {
    id: "4",
    rank: 3,
    name: "Michael Johnson",
    avatar: "/abstract-profile.png",
    level: 23,
    points: 1300,
    badges: 4,
    streak: 30,
  },
  {
    id: "5",
    rank: 3,
    name: "Michael Johnson",
    avatar: "/abstract-profile.png",
    level: 23,
    points: 1300,
    badges: 4,
    streak: 30,
  },
  {
    id: "6",
    rank: 3,
    name: "Michael Johnson",
    avatar: "/abstract-profile.png",
    level: 23,
    points: 1300,
    badges: 4,
    streak: 30,
  },
  {
    id: "7",
    rank: 3,
    name: "Michael Johnson",
    avatar: "/abstract-profile.png",
    level: 23,
    points: 1300,
    badges: 4,
    streak: 30,
  },
]

export default  function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState(mockUsers)
  const usersPerPage = 10
  const totalUsers = users.length

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = Math.min(startIndex + usersPerPage, totalUsers)
  const currentUsers = users.slice(startIndex, endIndex)
  const totalPages = Math.ceil(totalUsers / usersPerPage)

  return (
    <div className="w-full mt-6 rounded-md mx-auto p-6" style={{
                boxShadow: '0px 0px 10px 0px #0000001A'
            }}>
      <h1 className="text-2xl font-bold text-foreground mb-6">Leaderboard</h1>

      <div className="bg-background rounded-lg border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700 text-[20px] text-white">
                <th className="px-4 py-3 text-left font-normal">Rank</th>
                <th className="px-4 py-3 text-left font-normal">User</th>
                <th className="px-4 py-3 text-left font-normal">Level</th>
                <th className="px-4 py-3 text-left font-normal">Points</th>
                <th className="px-4 py-3 text-left font-normal">Badges</th>
                <th className="px-4 py-3 text-left font-normal">Streak</th>
                <th className="px-4 py-3 text-left font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b font-bold border-border ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3 text-foreground font-medium">{user.rank}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img
                          src={user.avatar || "/placeholder.svg?height=32&width=32"}
                          alt={user.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            target.nextElementSibling!.classList.remove("hidden")
                          }}
                        />
                        <span className="hidden text-xs font-bold ">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-foreground font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{user.level}</td>
                  <td className="px-4 py-3 text-foreground">{user.points.toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground">{user.badges}</td>
                  <td className="px-4 py-3 text-foreground">{user.streak} days</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-4 py-1 text-sm font-medium text-white bg-[#AC2927] hover:bg-red-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-border">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {endIndex} of {totalUsers} users
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ←
            </button>

            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-8 w-8 flex items-center justify-center text-sm rounded transition-colors ${
                    currentPage === pageNum ? "bg-[#343F4F] text-white" : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
