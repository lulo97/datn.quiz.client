import { getAllByClerkId } from "@/api/Permission";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Permission as IPermission } from "@/InterfacesDatabase";
import { useUser } from "@clerk/clerk-react";

export function Permission() {
    const [permissions, setPermissions] = useState<IPermission[]>([]);
    const { user } = useUser();

    useEffect(() => {
        async function fetchData() {
            if (!user) return;
            const ClerkId = user.id
            const result = await getAllByClerkId(ClerkId);
            if ("error" in result) {
                toast.error("Có lỗi");
                console.log(result);
            } else {
                setPermissions(result);
            }
        }
        fetchData();
    }, []);

    return (
        <Card className="flex-1">
            <CardHeader>
                <Label>Danh sách quyền</Label>
            </CardHeader>
            <CardContent>
                <ul className="text-sm list-disc pl-4 pt-2">
                    {permissions.map(ele => <li key={ele.PermissionId}>{ele.Name}</li>)}
                </ul>
            </CardContent>
        </Card>
    );
}
