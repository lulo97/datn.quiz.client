import BaseScreen from "../BaseScreen";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        Name: "Toán",
        Description: "Toán học",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Văn",
        Description:
            "Văn học",
        CreateAt: "02/03/2023",
    },
    {
        Name: "Anh",
        Description:
            "Tiếng Anh",
        CreateAt: "02/03/2023",
    }
];

const columns_data = [
    { accessor: "Name", header: "Chủ đề" },
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
            screen_title="Chủ đề câu hỏi" 
            mtf_props={mtf_props} 
        />
    );
}
