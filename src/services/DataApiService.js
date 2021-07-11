import axios from 'axios'

// https://vitejs.dev/guide/features.html#glob-import
// https://vitejs.dev/guide/env-and-mode.html
const env = import.meta.env
const http = axios.create({
  baseURL: env.VITE_ROOT_API,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const DataApiService = (endpoint) => {
    return http.get('/wp/v2/' + endpoint, { useCache: true })
}
