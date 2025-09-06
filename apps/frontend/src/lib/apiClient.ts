import ky from 'ky'

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_PREFIX_API_URL,
})
