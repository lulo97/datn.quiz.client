
import { TableCell } from "@/components/ui/table";
import { PenBox, X } from "lucide-react";
import BaseScreen from "../BaseScreen";

const data = [
    {
        Name: "Xóa người dùng",
        Description: "Người dùng có thể xóa người dùng khác",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Xem báo cáo",
        Description: "Người dùng có thể xem các báo cáo được gửi về",
        CreateAt: "02/03/2023",
    },
];

const columns_data = [
    { accessor: "Name", header: "Quyền" },
    { accessor: "Description", header: "Mô tả" },
    { accessor: "CreateAt", header: "Ngày tạo" },
];

const action_col = (
    <TableCell className="flex justify-between">
        <PenBox className="text-blue-500" />
        <X className="text-red-500" />
    </TableCell>
);

const header_class_condition = [{}];

export default function Permission() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Quyền người dùng" mtf_props={mtf_props} />;
}
