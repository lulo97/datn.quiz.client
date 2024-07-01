import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ModalRoleData } from "./ModalRole";
import { toast } from "react-toastify";
import { getAllByRole } from "@/api/Permission";

export function SelectPermission(props: ModalRoleData) {
    const { role, permissions, setPermissions } = props;

    useEffect(() => {
        async function fetchData() {
            if (!role) return;
            const result = await getAllByRole(role.RoleId);
            if ("error" in result) {
                toast.error("Có lỗi");
                console.log(result);
            } else {
                setPermissions(result);
            }
        }
        fetchData();
    }, [role]);

    return (
        <div>
            <Label>Quyền</Label>
            <div className="mt-4 flex flex-col gap-3">
                {!permissions && <div>Vai trò chưa có quyền!</div>}
                {permissions && permissions.map((ele) => (
                    <div key={ele.PermissionId} className="flex items-center gap-4">
                        <Checkbox checked />
                        <Label>{ele.Name}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
