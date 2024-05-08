import BaseScreen from "../BaseScreen";
import { getObjectId, getRandomDate } from "@/Utils";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        CommentId: getObjectId(),
        ParentId: getObjectId(),
        CreateUserId: getObjectId(),
        CreatedAt: getRandomDate(),
        UpdatedAt: getRandomDate(),
        Content: "Đề thi này thật tuyệt vời",
    },
    {
        CommentId: getObjectId(),
        ParentId: getObjectId(),
        CreateUserId: getObjectId(),
        CreatedAt: getRandomDate(),
        UpdatedAt: getRandomDate(),
        Content: "Đề thi này thật tệ",
    },
    {
        CommentId: getObjectId(),
        ParentId: getObjectId(),
        CreateUserId: getObjectId(),
        CreatedAt: getRandomDate(),
        UpdatedAt: getRandomDate(),
        Content: "Xin chào thế giới",
    },
];

const columns_data = [
    { accessor: "ParentId", header: "Mã cha" },
    { accessor: "CreatedAt", header: "Ngày tạo" },
    { accessor: "UpdatedAt", header: "Ngày sửa" },
    { accessor: "Content", header: "Nội dung" }
];

const action_col = <ActionColumn isDelete={true} isRead={true} isUpdate={true} />


const header_class_condition = [{}];

export default function Comment() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Bình luận" mtf_props={mtf_props} />;
}
