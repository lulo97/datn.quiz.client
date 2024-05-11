import { getObjectId, getRandomDate, strToDate } from "@/Utils";
import { ActionColumn } from "@/components/action_column/ActionColumn";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { TableColumnsType } from "antd";

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

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Mã đề",
        dataIndex: "QuizId",
        sorter: (a, b) => a.QuizId.localeCompare(b.QuizId),
    },
    {
        title: "Ngày tạo",
        dataIndex: "CreatedAt",
        sorter: (a, b) =>
            strToDate(a.CreatedAt).getTime() - strToDate(b.CreatedAt).getTime(),
    },
    {
        title: "Mã người dùng",
        dataIndex: "UserId",
        sorter: (a, b) => a.UserId.localeCompare(b.UserId),
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
            <ActionColumn isDelete isRead isUpdate />{" "}
        </div>
    ),
    width: "10%",
});

export function Like() {
    return (
        <BaseScreen
            screen_title="Lượt thích"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
