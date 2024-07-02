import { TableColumnsType } from "antd";
import { BaseScreen } from "../../components/base_screen/BaseScreen";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toDDMMYYY } from "@/Utils";
import { Eye } from "lucide-react";
import { ModalRole } from "./ModalRole";
import { getAll } from "@/api/UserRole";
import { UserRoleDetail } from "./Utils";

export function AllUser() {
    const [data, setData] = useState<UserRoleDetail[]>([]);

    async function fetchData() {
        try {
            const result = await getAll();
            if (!result || "error" in result) {
                toast.error("Có lỗi!");
                console.log(result);
            } else {
                setData(result);
            }
        } catch (error) {
            toast.error("Có lỗi!");
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const columns: TableColumnsType<UserRoleDetail> = useMemo(
        () => [
            {
                title: "Ảnh đại diện",
                sorter: true,
                width: "14%",
                render: (_item, record, _index) => (
                    <div className="w-full flex justify-center">
                        <Avatar>
                            <AvatarImage src={record.User.ImageUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                ),
            },
            {
                title: "Họ tên",
                sorter: true,
                render: (_item, record, _index) => record.User.Fullname,
            },
            {
                title: "Tài khoản",
                sorter: true,
                render: (_item, record, _index) => record.User.Username,
            },
            {
                title: "Vai trò",
                sorter: true,
                render: (_item, record, _index) => record.Role.Name,
            },
            {
                title: "Email",
                sorter: true,
                render: (_item, record, _index) => record.User.Email,
            },
            {
                title: "Ngày tạo",
                sorter: true,
                render: (_item, record, _index) =>
                    toDDMMYYY(record.User.CreatedAt),
            },
            {
                title: "Hành động",
                sorter: true,
                width: "13%",
                render: (_item, _record, _index) => (
                    <div className="flex justify-evenly">
                        <Eye className="text-yellow-500" />
                        <ModalRole userrole={_record} fetchData={fetchData} />
                    </div>
                ),
            },
        ],
        [fetchData]
    );
    return (
        <BaseScreen
            screen_title="Người dùng hệ thống"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
