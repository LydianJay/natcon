import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,                 
    withCredentials: false,        
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// Automatically attach CSRF token
api.interceptors.request.use(config => {
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content')

    if (token) {
        config.headers['X-CSRF-TOKEN'] = token
    }

    return config
})

export default api