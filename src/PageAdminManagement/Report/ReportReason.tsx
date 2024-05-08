
import { TableCell } from "@/components/ui/table";
import { PenBox, X } from "lucide-react";
import BaseScreen from "../BaseScreen";

const data = [
    {
        Name: "Phản cảm",
        Description: "Nội dung phản cảm",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Thù ghét",
        Description:
            "Nội dung thù ghét",
        CreateAt: "02/03/2023",
    },
];

const columns_data = [
    { accessor: "Name", header: "Lý do" },
    { accessor: "Description", header: "Mô tả" },
    { accessor: "CreateAt", header: "Ngày tạo" },
];

const action_col = (
    <TableCell className="flex justify-between">
        <PenBox className="text-blue-500" />
        <X className="text-red-500" />
    </TableCell>
);

const header_class_condition = [
    {header: "STT", class: "w-16"},
]

export default function ReportReason() {
    
    const mtf_props = {
        data: data, 
        columns_data: columns_data, 
        page_index: 0, 
        page_size: 7, 
        action_col: action_col, 
        header_class_condition: header_class_condition
    }

    return (
        <BaseScreen 
            screen_title="Lý do báo cáo" 
            mtf_props={mtf_props} 
        />
    );
}
