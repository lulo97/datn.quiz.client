import { getObjectId, getRandomDate, strToDate } from "@/Utils";
import { ActionColumn } from "@/components/action_column/ActionColumn";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { TableColumnsType } from "antd";

const data = [
    {
        RatingId: getObjectId(),
        UserId: getObjectId(),
        QuizId: getObjectId(),
        Score: 4,
        CreatedAt: getRandomDate(),
    },
    {
        RatingId: getObjectId(),
        UserId: getObjectId(),
        QuizId: getObjectId(),
        Score: 4.5,
        CreatedAt: getRandomDate(),
    },
    {
        RatingId: getObjectId(),
        UserId: getObjectId(),
        QuizId: getObjectId(),
        Score: 3,
        CreatedAt: getRandomDate(),
    },
    {
        RatingId: getObjectId(),
        UserId: getObjectId(),
        QuizId: getObjectId(),
        Score: 1,
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
    {
        title: "Điểm",
        dataIndex: "Score",
        sorter: (a, b) => a.Score - b.Score,
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

export function Rating() {
    return (
        <BaseScreen
            screen_title="Đánh giá"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
