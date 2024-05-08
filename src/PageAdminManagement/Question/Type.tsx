import BaseScreen from "../BaseScreen";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        Name: "Một đáp án",
        Description: "Câu hỏi chỉ có một đáp án đúng",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Nhiều đáp án",
        Description:
            "Câu hỏi có nhiều đáp án đúng",
        CreateAt: "02/03/2023",
    }
];

const columns_data = [
    { accessor: "Name", header: "Loại" },
    { accessor: "Description", header: "Mô tả" },
    { accessor: "CreateAt", header: "Ngày tạo" },
];

const action_col = <ActionColumn isDelete={true} isRead={false} isUpdate={true} />
const header_class_condition = [
    {header: "STT", class: "w-16"},
]

export default function Language() {
    
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
            screen_title="Loại câu hỏi" 
            mtf_props={mtf_props} 
        />
    );
}
