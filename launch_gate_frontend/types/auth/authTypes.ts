

export type loginDetailsType = {
    email: string,
    password: string
}

export type loginReturnType = {
    success: boolean,
    message?: string,
    tokens: tokenTypes
}

export type tokenTypes = {
    refresh: string,
    access: string
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
    referralSlug: string | null,
    account_status: string,
    referral_slug: string | null
}

export type signupUserDetailsType = {
    email: string,
    username: string,
    full_name: string,
    phone_number: string,
    country: string,
    region: string,
    city: string,
}

export type signupUserResponseType = {
    success: boolean,
    message?: string,
    tokens: tokenTypes
}

export type profileUpdateDetailsType = {
    full_name: string,
    phone_number: string,
    username: string,
    country: string,
    region: string,
    city: string,
}

export type profileUpdateResponseType = {
    success: boolean,
    message: string
}

export type useAuthStoreType = {
    isAuthenticated: boolean,
    user: checkAuthUserReturnType | null,
    checkAuth: () => Promise<checkAuthUserReturnType>,
    signupUser: (data: signupUserDetailsType) => Promise<signupUserResponseType>,
    loginUser: (data: loginDetailsType) => Promise<loginReturnType>,
    logoutUser: () => Promise<void>,
    profileUpdate: (data: profileUpdateDetailsType) => Promise<profileUpdateResponseType>
}