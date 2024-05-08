
import { TableCell } from "@/components/ui/table";
import { PenBox, X } from "lucide-react";
import BaseScreen from "../BaseScreen";

const data = [
    {
        Name: "Nhận biết",
        Description: "Nhận biết, nhắc lại được kiến thức, kĩ năng đã học.",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Thông hiểu",
        Description:
            "Hiểu kiến thức, kĩ năng đã học. trình bày, giải thích được kiến thức theo cách hiểu của cá nhân.",
        CreateAt: "02/03/2023",
    },
    {
        Name: "Vận dụng",
        Description:
            "Biết vận dụng kiến thức, kĩ năng đã học để giải quyết những vấn dề quen thuộc, tương tự trong học tập, cuộc sống.",
        CreateAt: "05/09/2008",
    },
    {
        Name: "Vận dụng cao",
        Description:
            "Vận dụng các kiến thức, kĩ năng đã học để giải quyết vấn đề mới hoặc đưa ra những phản hồi hợp lý trong học tập, cuộc sống một cách linh hoạt.",
        CreateAt: "05/09/2008",
    },
];

const columns_data = [
    { accessor: "Name", header: "Độ khó" },
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
    { header: "Độ khó", class: "w-28" },
];

export default function Difficult() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Độ khó câu hỏi" mtf_props={mtf_props} />;
}
