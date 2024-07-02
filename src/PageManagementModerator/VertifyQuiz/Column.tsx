import { toDDMMYYY } from "@/Utils";
import { TableColumnsType } from "antd";
import { QuizForVertify } from "./Utils";
import { Button } from "@/components/ui/button";
import { ModalVertify } from "./ModalVertify";
import { User } from "@/InterfacesDatabase";

export function getColumn(
    currentUser: User,
    fetchDataQuizForVertify: () => Promise<void>,
    navigate: any
) {
    const columns: TableColumnsType<QuizForVertify> = [
        {
            title: "Tên đề",
            sorter: true,
            width: "20%",
            render: (_value, record, _index) => (
                <div className="line-clamp-1">{record.Name}</div>
            ),
        },
        {
            title: "Đường dẫn",
            sorter: true,
            render: (_value, record, _index) => (
                <Button
                    className="p-0 m-0 h-fit text-xs"
                    onClick={() => navigate(`/de-thi/${record.QuizId}`)}
                    variant="link"
                >
                    Link
                </Button>
            ),
        },
        {
            title: "Người kiểm duyệt",
            sorter: true,
            render: (_value, record, _index) => (
                <div>
                    {record.UserVertify ? record.UserVertify.Username : "NULL"}
                </div>
            ),
        },
        {
            title: "Ngày kiểm duyệt",
            sorter: true,
            render: (_value, record, _index) => (
                <div>
                    {record.VerifiedAt ? toDDMMYYY(record.VerifiedAt) : "NULL"}
                </div>
            ),
        },
        {
            title: "Kiểm duyệt",
            sorter: true,
            width: "14%",
            render: (_value, record, _index) => (
                <div className="flex justify-center items-center h-fit">
                    <ModalVertify
                        record={record}
                        fetchDataQuizForVertify={fetchDataQuizForVertify}
                        currentUser={currentUser}
                    />
                </div>
            ),
        },
    ];
    return columns;
}
