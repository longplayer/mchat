import axios from 'axios'

// https://vitejs.dev/guide/features.html#glob-import
// https://vitejs.dev/guide/env-and-mode.html
const env = import.meta.env

const apiServer = axios.create({
  baseURL: env.VITE_ROOT_API,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getDataFromApi(endpoint) {
    return apiServer.get('/wp/v2/' + endpoint)
  },
}
