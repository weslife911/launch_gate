import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_FRONTEND_LOCAL_BASE_URL as string;

if (!API_URL) {
    throw new Error("API URL is not defined in environment variables");
}

export const axiosInstance = axios.create({
    baseURL: API_URL,
});