import { TableColumnsType } from "antd";
import { data } from "./MockData";
import ActionColumn from "@/components/action_column/ActionColumn";
import BaseScreen from "@/components/base_screen/BaseScreen";

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Nội dung",
        dataIndex: "Content",
        sorter: (a, b) => a.Content.localeCompare(b.Content),
    },
    {
        title: "Loại câu hỏi",
        dataIndex: "Type",
        sorter: (a, b) => a.Type.localeCompare(b.Type),
    },
    {
        title: "Chủ đề",
        dataIndex: "SubSubject",
        sorter: (a, b) => a.SubSubject.localeCompare(b.SubSubject),
    },
    {
        title: "Trình độ",
        dataIndex: "EducationLevel",
        sorter: (a, b) => a.EducationLevel.localeCompare(b.EducationLevel),
    },
    {
        title: "Độ khó",
        dataIndex: "DifficultLevel",
        sorter: (a, b) => a.DifficultLevel.localeCompare(b.DifficultLevel),
    },
    {
        title: "Ngôn ngữ",
        dataIndex: "Language",
        sorter: (a, b) => a.Language.localeCompare(b.Language),
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

export default function CreatedQuestion() {
    return (
        <BaseScreen
            screen_title="Câu hỏi"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
