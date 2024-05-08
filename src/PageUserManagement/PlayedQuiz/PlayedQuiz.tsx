import BaseScreen from "../BaseScreen";
import { data } from "./MockData";
import ActionColumn from "@/components/action_column/ActionColumn";

const columns_data = [
    { accessor: "Name", header: "Tên đề" },
    { accessor: "Subject", header: "Chủ đề" },
    { accessor: "EducationLevel", header: "Trình độ" },
];

const action_col = <ActionColumn isDelete={true} isRead={true} isUpdate={false} />

const header_class_condition = [
    { header: "Chủ đề", class: "w-20" },
    { header: "Trình độ", class: "w-20" },
];

export default function PlayedQuiz() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Đề đã làm" mtf_props={mtf_props} />;
}
