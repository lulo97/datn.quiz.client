import { toDDMMYYY } from "@/Utils";
import { TableColumnsType } from "antd";
import { QuizForVertify } from "../Utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function getColumn(
    handleCheck: (record: QuizForVertify) => Promise<void>,
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
                    <Checkbox
                        onClick={() => handleCheck(record)}
                        checked={record.UserVertify ? true : false}
                    />
                </div>
            ),
        },
    ];
    return columns;
}
