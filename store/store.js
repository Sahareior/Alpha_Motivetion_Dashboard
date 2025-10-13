import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from './slices/apiSlice'


export  const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})
