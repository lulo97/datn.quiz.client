import { TableColumnsType } from "antd";
import { data } from "./MockData";
import { ActionColumn } from "@/components/action_column/ActionColumn";
import { BaseScreen } from "@/components/base_screen/BaseScreen";

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Nội dung",
        dataIndex: "Content",
        sorter: true,
    },
    {
        title: "Loại trắc nghiệm",
        dataIndex: "Type",
        sorter: true,
    },
    {
        title: "Chủ đề",
        dataIndex: "SubSubject",
        sorter: true,
    },
    {
        title: "Trình độ",
        dataIndex: "EducationLevel",
        sorter: true,
    },
    {
        title: "Độ khó",
        dataIndex: "DifficultLevel",
        sorter: true,
    },
    {
        title: "Ngôn ngữ",
        dataIndex: "Language",
        sorter: true,
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

export function CreatedQuestion() {
    return (
        <BaseScreen
            screen_title="Câu hỏi"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
