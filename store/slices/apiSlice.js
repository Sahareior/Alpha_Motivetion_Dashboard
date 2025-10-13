import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://7371c9a9b5f2.ngrok-free.app/api/',
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
  }),
})

// Export auto-generated hooks
export const { useGetPokemonByNameQuery, useLoginDashboardMutation } = pokemonApi
