import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.10.13.36:8888',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token1212') // get token from localStorage
      console.log(token,'this is token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    // Example GET request
    getPokemonByName: build.query({
      query: (name) => `pokemon/${name}`,
    }),

    // Example POST request (login)


    loginDashboard: build.mutation({
      query: (data) => ({
        url: 'auth/login/',
        method: 'POST',
        body: data,
      }),
    }),

    dashboardGraph: build.query({
      query: ()=> '/dashboard/graphs/'
    }),
    // .....................................................new..................................

    dashboardLogin: build.mutation({
      query: (data)=> ({
        url: '/dashboard/login/',
        method: "POST",
        body:data
      })
    }),

revenuData: build.query({
  query: (year) => `dashboard/revenue_report/?year=${year}`,
}),

userActivity: build.query({
  query: ()=> '/dashboard/weekly_user_activity/'
}),

subsDist: build.query({
  query: ()=> "/dashboard/subscription_distribution/"
}),

    dashboardStats: build.query({
      query: ()=> "/dashboard/dashboard_data/"
    }),

    userLists: build.query({
      query: ()=> '/users/'
    }),

    userDelete: build.mutation({
      query: (id) => ({
        url: `users/${id}/`,
        method: 'DELETE',
      })
    }),

    // Dashboard Apis

    // category apis

    allCategories: build.query({
      query: ()=> '/categories/'
    }),

  createCategory: build.mutation({
      query: (data)=> ({
        url:'/categories/',
        method: 'POST',
        body: data
      })
    }),

    getSubs: build.query({
      query: ()=> 'subscription-plans/'
    }),

    dashBoardOverview: build.query({
      query: () => "dashboard/overview/"
    })
  }),
})

// Export auto-generated hooks
export const { useGetPokemonByNameQuery, useLoginDashboardMutation,
   useAllCategoriesQuery,useGetSubsQuery, useRevenuDataQuery,
  useUserActivityQuery,useSubsDistQuery,
  useDashboardStatsQuery, useDashboardLoginMutation,
  useDashBoardOverviewQuery,useDashboardGraphQuery,useUserListsQuery,
   useUserDeleteMutation,useCreateCategoryMutation } = pokemonApi
