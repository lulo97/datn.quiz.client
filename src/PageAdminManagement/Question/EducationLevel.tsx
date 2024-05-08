import { TableCell } from "@/components/ui/table";
import { PenBox, X } from "lucide-react";
import BaseScreen from "../BaseScreen";

const data = [
    { Name: "Lớp 1", Description: "Lớp 1", CreateAt: "07/05/2024" },
    { Name: "Lớp 2", Description: "Lớp 2", CreateAt: "02/03/2023" },
    { Name: "Lớp 3", Description: "Lớp 3", CreateAt: "05/09/2008" },
    { Name: "Lớp 4", Description: "Lớp 4", CreateAt: "10/08/2000" },
    { Name: "Lớp 5", Description: "Lớp 5", CreateAt: "04/12/2003" },
    { Name: "Lớp 6", Description: "Lớp 6", CreateAt: "07/08/2001" },
    { Name: "Lớp 7", Description: "Lớp 7", CreateAt: "14/08/2022" },
    { Name: "Lớp 8", Description: "Lớp 8", CreateAt: "27/12/2021" },
    { Name: "Lớp 9", Description: "Lớp 9", CreateAt: "17/08/2000" },
    { Name: "Lớp 10", Description: "Lớp 10", CreateAt: "27/06/2015" },
    { Name: "Lớp 11", Description: "Lớp 11", CreateAt: "07/11/2014" },
    { Name: "Lớp 12", Description: "Lớp 12", CreateAt: "29/04/2000" },
];

const columns_data = [
    { accessor: "Name", header: "Trình độ" },
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
    {header: "STT", class: "w-16"}
]

export default function EducationLevel() {

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
            screen_title="Trình độ học vấn câu hỏi" 
            mtf_props={mtf_props} 
        />
    );
}
