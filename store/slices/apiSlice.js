import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URI, 
    prepareHeaders: (headers) => {
      // Add auth header
      const token = localStorage.getItem("token1212");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    // Example GET request
    getPokemonByName: build.query({
      query: (name) => `pokemon/${name}`,
    }),

    // Example POST request (login)

    profile: build.query({
      query: () => "/users/profile/get",
    }),

    loginDashboard: build.mutation({
      query: (data) => ({
        url: "auth/login/",
        method: "POST",
        body: data,
      }),
    }),

    dashboardGraph: build.query({
      query: () => "/dashboard/graphs/",
    }),
    // .....................................................new..................................

    notificationCreate: build.mutation({
      query: (data) => ({
        url: "/dashboard/notifications/",
        method: "POST",
        body: data,
      }),
    }),

    notificationDelete: build.mutation({
      query: (id) => ({
        url: `/dashboard/notifications/${id}/`,
        method: "DELETE",
      }),
    }),

    dashboardLogin: build.mutation({
      query: (data) => ({
        url: "/dashboard/login/",
        method: "POST",
        body: data,
      }),
    }),

    revenuData: build.query({
      query: (year) => `dashboard/revenue_report/?year=${year}`,
    }),

    userActivity: build.query({
      query: () => "/dashboard/weekly_user_activity/",
    }),

    subsDist: build.query({
      query: () => "/dashboard/subscription_distribution/",
    }),

    dashboardStats: build.query({
      query: () => "/dashboard/dashboard_data/",
    }),

    userLists: build.query({
      query: ({ page = 1, pageSize = 2 } = {}) =>
        `/dashboard/users/?page=${page}&page_size=10`,
    }),

    deactiveUser: build.mutation({
      query: (data) => ({
        url: "/dashboard/account/deactivate",
        method: "POST",
        body: data,
      }),
    }),

    userDelete: build.mutation({
      query: (id) => ({
        url: `users/${id}/`,
        method: "DELETE",
      }),
    }),

    // Dashboard Apis

    // category apis

    allCategories: build.query({
      query: () => "/categories/",
    }),

    createCategory: build.mutation({
      query: (data) => ({
        url: "/categories/",
        method: "POST",
        body: data,
      }),
    }),

    getSubs: build.query({
      query: () => "subscription-plans/",
    }),

    getAllNotification: build.query({
      query: () => "/dashboard/notifications",
    }),
    editNotification: build.mutation({
      query: ({ id, data }) => ({
        url: `/dashboard/notifications/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),

    getBadges: build.query({
      query: () => "/dashboard/badges/",
    }),

    createBadges: build.mutation({
      query: (data) => ({
        url: "/dashboard/badges/",
        method: "POST",
        body: data,
      }),
    }),

    dashLeaderBoard: build.query({
      query: ({ page = 1, page_size = 5 } = {}) =>
        `/dashboard/leaderboard/?page=${page}&page_size=5`,
    }),

    dashLeaderboardDelete: build.mutation({
      query: (id) => ({
        url: `/dashboard/leaderboard/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    getPlans: build.query({
      query: ({ page = 1, page_size = 5 } = {}) =>
        `/dashboard/payments/?page=${page}&page_size=5`,
    }),

    getPrivacy: build.query({
      query: () => "/dashboard/privacy-policy/",
    }),

    postPrivacy: build.mutation({
      query: (data) => ({
        url: "/dashboard/admin/privacy-policy/",
        method: "POST",
        body: data,
      }),
    }),

    getTerms: build.query({
      query: () => "/dashboard/terms-and-condition/",
    }),

    postTerms: build.mutation({
      query: (data) => ({
        url: "/dashboard/admin/terms-and-condition/",
        method: "POST",
        body: data,
      }),
    }),

    suspendUser: build.query({
      query: (id) => ({
        url: `/dashboard/account/deactivate/${id}/`,
      }),
    }),

    reactiveUser: build.query({
      query: (id) => ({
        url: `/dashboard/account/activate/${id}/`,
      }),
    }),

    subsPlanList: build.query({
      query: () => "dashboard/subscription-plan/list/",
    }),

    planUpdate: build.mutation({
      query: ({ name, price }) => ({
        url: `/dashboard/subscription-plan/${name}/update/`,
        method: "PUT",
        body: price,
      }),
    }),

    deleteDashUser: build.mutation({
      query: (id) => ({
        url: `/dashboard/account/delete/${id}/`,
        method: "DELETE",
      }),
    }),

    dashPaymentDelete: build.mutation({
      query: (id) => ({
        url: `/dashboard/payments/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    leaderBoardDelete: build.mutation({
      query: (id) => ({
        url: `/dashboard/leaderboard/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    updatePlanType: build.mutation({
      query: (data) => ({
        url: "/dashboard/users/subscription/update/",
        method: "POST",
        body: data,
      }),
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: "/users/profile/update",
        method: "PUT",
        body: data,
      }),
    }),

    dashBoardOverview: build.query({
      query: () => "dashboard/overview/",
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetPokemonByNameQuery,
  useUpdateProfileMutation,
  useNotificationDeleteMutation,
  useUpdatePlanTypeMutation,
  useProfileQuery,
  useLoginDashboardMutation,
  usePlanUpdateMutation,
  useGetPrivacyQuery,
  useGetTermsQuery,
  usePostPrivacyMutation,
  usePostTermsMutation,
  useAllCategoriesQuery,
  useGetSubsQuery,
  useRevenuDataQuery,
  useDashLeaderBoardQuery,
  useDashLeaderboardDeleteMutation,
  useLazySuspendUserQuery,
  useUserActivityQuery,
  useSubsDistQuery,
  useDeactiveUserMutation,
  useGetBadgesQuery,
  useCreateBadgesMutation,
  useGetPlansQuery,
  useLeaderBoardDeleteMutation,
  useDashboardStatsQuery,
  useDashboardLoginMutation,
  useNotificationCreateMutation,
  useGetAllNotificationQuery,
  useEditNotificationMutation,
  useDashBoardOverviewQuery,
  useDashboardGraphQuery,
  useUserListsQuery,
  useSubsPlanListQuery,
  useDeleteDashUserMutation,
  useDashPaymentDeleteMutation,
  useUserDeleteMutation,
  useCreateCategoryMutation,
  useLazyReactiveUserQuery,
} = pokemonApi;
