import { TableColumnsType } from "antd";

import { data } from "./MockData";
import ActionColumn from "@/components/action_column/ActionColumn";
import BaseScreen from "@/components/base_screen/BaseScreen";

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Tên",
        dataIndex: "Name",
        sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
        title: "Trình độ",
        dataIndex: "EducationLevel",
        sorter: (a, b) => a.EducationLevel.localeCompare(b.EducationLevel),
    },
    {
        title: "Chủ đề",
        dataIndex: "Subject",
        sorter: (a, b) => a.Subject.localeCompare(b.Subject),
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

export default function CreatedQuiz() {
    return (
        <BaseScreen
            screen_title="Đề đã làm"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
