import { useContactStoreType } from "@/types/contact/contactTypes"
import { axiosInstance } from "@/utils/axiosInstance"
import { create } from "zustand"

export const useContactStore = create<useContactStoreType>(() => ({
    sendEmail: async(data) => {
        const response = await axiosInstance.post("/contact/", data);
        return response.data;
    }
}))