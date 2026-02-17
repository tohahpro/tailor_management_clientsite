import { UserRole } from "@/lib/authUtils";
import { ITailor } from "./tailor.interface";
import { IAdmin } from "./admin.interface";

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';


export interface UserInfo {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    tailor?: ITailor;
    admin?: IAdmin;
    createdAt: string;
    updatedAt: string;
}
