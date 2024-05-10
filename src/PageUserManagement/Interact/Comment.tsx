import { getObjectId, getRandomDate, strToDate } from "@/Utils";
import ActionColumn from "@/components/action_column/ActionColumn";
import BaseScreen from "@/components/base_screen/BaseScreen";
import { TableColumnsType } from "antd";

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

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Mã cha",
        dataIndex: "ParentId",
        sorter: (a, b) => a.ParentId.localeCompare(b.ParentId),
    },
    {
        title: "Ngày tạo",
        dataIndex: "CreatedAt",
        sorter: (a, b) =>
            strToDate(a.CreatedAt).getTime() - strToDate(b.CreatedAt).getTime(),
    },
    {
        title: "Ngày sửa",
        dataIndex: "UpdatedAt",
        sorter: (a, b) =>
            strToDate(a.UpdatedAt).getTime() - strToDate(b.UpdatedAt).getTime(),
    },
    {
        title: "Nội dung",
        dataIndex: "Content",
        sorter: (a, b) => a.Content.localeCompare(b.Content),
    },
];

columns.unshift({
    title: "STT",
    dataIndex: "STT",
    render: (_item, record, _index) => <div>{data.indexOf(record) + 1}</div>,
    width: "5%",
});

columns.push({
    title: "Hành động",
    key: "action",
    render: (_item, _record, _index) => (
        <div className="flex gap-2 justify-end">
            <ActionColumn isDelete={true} isRead={true} isUpdate={true} />
        </div>
    ),
    width: "10%",
});

export default function Comment() {
    return (
        <BaseScreen
            screen_title="Bình luận"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
