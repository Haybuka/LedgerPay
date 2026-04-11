export type UserProfileType = {
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
    phone: string;
    account: UserAccountType
}

export type UserAccountType = {
    balance: number,
    currency: string,
    accountNumber: string

}
