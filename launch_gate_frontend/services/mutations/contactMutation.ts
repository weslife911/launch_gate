"use client"

import { useContactStore } from "@/store/useContactStore"
import { sendEmailType } from "@/types/contact/contactTypes";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useContactMutation = () => {
    const { sendEmail } = useContactStore();
    return useMutation({
        mutationKey: ["send-email"],
        mutationFn: async(data: sendEmailType) => await sendEmail(data),
        onSuccess: () => {
            toast.success("Email sent successfully");
        },
        onError: () => {
            toast.error("Error while sending email");
        }
    });
}