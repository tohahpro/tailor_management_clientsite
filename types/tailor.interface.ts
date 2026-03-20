export interface ITailor {
    id: string;
    name?: string;
    storeName?: string;
    contactNumber?: string;
    email: string;
    role: string;
    status: string;
    address: string;
    authtype: string;
    profilePhoto?: string;
    isPasswordChange: boolean;
    user: {
        role?: string;
        status?: string;
        authtype?: string;
    };
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}