import { Role, User } from "@/InterfacesDatabase";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { SelectRole } from "./SelectRole";
import { SelectPermission } from "./SelectPermission";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";
import { PermissionDetail } from "../Permission/Utils";
import { toast } from "react-toastify";
import { UserRoleDetail } from "./Utils";
import { updateOne } from "@/api/UserRole";

export interface ModalRoleData {
    user: User;
    role: Role;
    setRole: React.Dispatch<React.SetStateAction<Role>>;
    permissions: PermissionDetail[] | undefined;
    setPermissions: React.Dispatch<
        React.SetStateAction<PermissionDetail[] | undefined>
    >;
}

interface Props {
    userrole: UserRoleDetail;
    fetchData: () => void;
}

export function ModalRole(props: Props) {
    const { userrole, fetchData } = props;
    const [role, setRole] = useState<Role>(userrole.Role);
    const [permissions, setPermissions] = useState<PermissionDetail[]>();
    const [open, setOpen] = useState(false);

    const child_props: ModalRoleData = {
        user: userrole.User,
        role: role,
        permissions: permissions,
        setRole: setRole,
        setPermissions: setPermissions,
    };

    async function handleSubmit() {
        if (!role) return;
        try {
            const result = await updateOne({
                UserId: userrole.User.UserId,
                RoleId: role.RoleId,
            });
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi");
                console.error(result);
            } else {
                toast.success("Sửa vai trò thành công!");
                setOpen(false);
                fetchData();
            }
        } catch (error) {
            toast.error("Có lỗi");
            console.error(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Settings className="text-gray-500" />
            </DialogTrigger>
            <DialogContent className="h-[90vh] flex flex-col">
                <DialogHeader className="h-fit">
                    <DialogTitle>Cài đặt quyền và vai trò</DialogTitle>
                    <DialogDescription>
                        Cài đặt quyền và vai trò của người dùng
                    </DialogDescription>
                </DialogHeader>
                <div className="h-[60vh] overflow-y-auto flex flex-col gap-5 border rounded-l-lg py-2 px-4">
                    <div className="text-sm">
                        <span className="font-semibold">Họ tên: </span>
                        {userrole.User.Fullname}
                    </div>
                    <div className="text-sm">
                        <span className="font-semibold">Tài khoản: </span>
                        {userrole.User.Username}
                    </div>
                    <SelectRole {...child_props} />
                    <SelectPermission {...child_props} />
                </div>
                <DialogFooter className="h-fit flex justify-between">
                    <Button onClick={handleSubmit}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
