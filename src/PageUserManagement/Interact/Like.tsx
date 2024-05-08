import BaseScreen from "../BaseScreen";
import { getObjectId, getRandomDate } from "@/Utils";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        QuizId: getObjectId(),
        UserId: getObjectId(),
        CreatedAt: getRandomDate(),
    },
    {
        QuizId: getObjectId(),
        UserId: getObjectId(),
        CreatedAt: getRandomDate(),
    },
    {
        QuizId: getObjectId(),
        UserId: getObjectId(),
        CreatedAt: getRandomDate(),
    },
    {
        QuizId: getObjectId(),
        UserId: getObjectId(),
        CreatedAt: getRandomDate(),
    },
];

const columns_data = [
    { accessor: "QuizId", header: "Đề" },
    { accessor: "UserId", header: "Người tạo" },
    { accessor: "CreatedAt", header: "Ngày tạo" },
];

const action_col =<ActionColumn isDelete={true} isRead={true} isUpdate={false} />

const header_class_condition = [{}];

export default function Like() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Lượt thích" mtf_props={mtf_props} />;
}
