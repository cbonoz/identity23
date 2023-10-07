import axios from 'axios'

const baseUrl = window.location.origin

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const postGenerateVC = async (handle) => {
    const res = await axiosInstance.post(`/api/provision`, {handle})
    return res.data
}

export const postVerifyVP = async (presentation) => {
    const res = await axiosInstance.post(`/api/verify`, {presentation})
    return res.data
}

