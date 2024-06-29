import { useEffect, useState } from "react";
import { Permission } from "@/InterfacesDatabase";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getAll } from "../Permission/API";
import { ModalRoleData } from "./ModalRole";
import { getAllByRole } from "./API";
import { toast } from "react-toastify";

export function SelectPermission(props: ModalRoleData) {
    const { role, permissions, setPermissions } = props;
    const [options, setOptions] = useState<Permission[]>();

    async function fetchData() {
        const records: Permission[] = await getAll();
        setOptions(records);
    }

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

    useEffect(() => {
        fetchData();
    }, []);

    if (!options) return <div>Đang tải!</div>;

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
