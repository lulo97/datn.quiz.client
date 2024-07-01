import { UserRole, Role, User } from "@/InterfacesDatabase";

export interface UserRoleDetail extends Omit<UserRole, "RoleId" | "UserId"> {
    Role: Role;
    User: User;
}
