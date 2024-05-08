import BaseScreen from "../BaseScreen";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        Name: "Tạo 100 đề",
        Description: "Người dùng tạo 100 đề",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Làm 100 đề",
        Description: "Người dùng làm 100 đề",
        CreateAt: "02/03/2023",
    },
];

const columns_data = [
    { accessor: "Name", header: "Thành tựu" },
    { accessor: "Description", header: "Mô tả" },
    { accessor: "CreateAt", header: "Ngày tạo" },
];

const action_col = <ActionColumn isDelete={true} isRead={false} isUpdate={true} />

const header_class_condition = [{}];

export default function Achievement() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return (
        <BaseScreen screen_title="Thành tựu người dùng" mtf_props={mtf_props} />
    );
}
