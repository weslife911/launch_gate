

export type loginDetailsType = {
    email: string,
    password: string
}

export type loginReturnType = {
    success: boolean,
    message: string
}

export type checkAuthUserReturnType = {
    id: string,
    email: string,
    username: string,
    full_name: string,
    phone_number: string,
    country: string,
    region: string,
    city: string,
    niches: string[],
    referralSlug: string | null,
    account_status: string
}

export type useAuthStoreType = {
    isAuthenticated: boolean,
    user: checkAuthUserReturnType | null,
    checkAuth: () => Promise<checkAuthUserReturnType>
    loginUser: (data: loginDetailsType) => Promise<loginReturnType>
}