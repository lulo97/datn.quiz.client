import { getObjectId, getRandomInt } from "@/Utils";
import { ActionColumn } from "@/components/action_column/ActionColumn";
import { TableColumnsType } from "antd";
import { AntdTable } from "@/components/antd_table/AntdTable";

const data = [
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
    { Score: getRandomInt(1, 30), QuizId: getObjectId() },
];

export type DataType = (typeof data)[0];

export const columns: TableColumnsType<DataType> = [
    {
        title: "Điểm",
        dataIndex: "Score",
        sorter: true,
        filters: [
            { text: "1", value: 1 },
            { text: "15", value: 15 },
            { text: "30", value: 30 },
        ],
        filterSearch: true,
        onFilter: (value, record) => record.Score === value,
    },
    {
        title: "Mã đề",
        dataIndex: "QuizId",
        sorter: true,
        filterSearch: true,
        onFilter: (value, record) => record.QuizId.includes(value as string),
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

export function AnswerSheetResults() {
    return <AntdTable columns={columns} data={data} defaultPageSize={5} />;
}
