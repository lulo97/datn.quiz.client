import { Permission, Role } from "@/InterfacesDatabase";

export interface PermissionDetail extends Permission {
    Role: Role | null;
}
