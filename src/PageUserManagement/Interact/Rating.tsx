import BaseScreen from "../BaseScreen";
import { getObjectId, getRandomDate } from "@/Utils";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        RatingId: getObjectId(),
        UserId:  getObjectId(),
        QuizId:  getObjectId(),
        Score: 4,
        CreatedAt: getRandomDate()
    },
    {
        RatingId: getObjectId(),
        UserId:  getObjectId(),
        QuizId:  getObjectId(),
        Score: 4.5,
        CreatedAt: getRandomDate()
    },
    {
        RatingId: getObjectId(),
        UserId:  getObjectId(),
        QuizId:  getObjectId(),
        Score: 3,
        CreatedAt: getRandomDate()
    },
    {
        RatingId: getObjectId(),
        UserId:  getObjectId(),
        QuizId:  getObjectId(),
        Score: 1,
        CreatedAt: getRandomDate()
    },
];

const columns_data = [
    { accessor: "QuizId", header: "Đề" },
    { accessor: "UserId", header: "Người tạo" },
    { accessor: "CreatedAt", header: "Ngày tạo" },
    { accessor: "Score", header: "Điểm" }
];

const action_col = <ActionColumn isDelete={true} isRead={true} isUpdate={true} />

const header_class_condition = [{}];

export default function Rating() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Đánh giá" mtf_props={mtf_props} />;
}
