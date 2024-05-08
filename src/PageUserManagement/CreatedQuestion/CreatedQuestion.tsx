import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Eye, PenBox, X } from "lucide-react";
import BaseScreen from "../BaseScreen";
import { QuestionData, data } from "./MockData";
import { head } from "lodash";

const columns_data = [
    { accessor: "Content", header: "Nội dung" },
    { accessor: "Type", header: "Loại câu hỏi" },
    { accessor: "SubSubject", header: "Chủ đề" },
    { accessor: "EducationLevel", header: "Trình độ" },
    { accessor: "DifficultLevel", header: "Độ khó" },
    { accessor: "Language", header: "Ngôn ngữ" },
];

const action_col = (
    <TableCell className="flex justify-between">
        <Eye className="text-yellow-500" />
        <PenBox className="text-blue-500" />
        <X className="text-red-500" />
    </TableCell>
);

const header_class_condition = [
    {header: "Loại câu hỏi", class: "w-24"},
    {header: "Chủ đề", class: "w-20"},
    {header: "Trình độ", class: "w-20"},
    {header: "Ngôn ngữ", class: "w-24"}
];

export default function CreatedQuestion() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Câu hỏi đã tạo" mtf_props={mtf_props} />;
}
