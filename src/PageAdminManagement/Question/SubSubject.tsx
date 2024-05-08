import { getObjectId } from "@/Utils";
import BaseScreen from "../BaseScreen";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        SubjectId: getObjectId(),
        Name: "Hàm số",
        Description: "Hàm số toán học",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Nghị luận",
        SubjectId: getObjectId(),
        Description:
            "Nghị luận văn học",
        CreateAt: "02/03/2023",
    },
    {
        Name: "Noun",
        SubjectId: getObjectId(),
        Description:
            "Noun (danh từ)",
        CreateAt: "02/03/2023",
    }
];

const columns_data = [
    { accessor: "SubjectId", header: "Mã chủ đề" },
    { accessor: "Name", header: "Chủ đề phụ" },
    { accessor: "Description", header: "Mô tả" },
    { accessor: "CreateAt", header: "Ngày tạo" },
];

const action_col = <ActionColumn isDelete={true} isRead={false} isUpdate={true} />

const header_class_condition = [
    {header: "STT", class: "w-16"},
]

export default function Subject() {
    
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
            screen_title="Chủ đề phụ câu hỏi" 
            mtf_props={mtf_props} 
        />
    );
}
