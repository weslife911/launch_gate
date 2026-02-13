
export type sendEmailType = {
    name: string,
    email: string,
    subject: string,
    message: string
}

export type useContactStoreType = {
    sendEmail: (data: sendEmailType) => Promise<void>
}