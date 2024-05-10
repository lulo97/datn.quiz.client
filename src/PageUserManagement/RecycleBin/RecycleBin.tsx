import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { TableColumnsType } from "antd";
import { data } from "./MockData";
import { ActionColumn } from "@/components/action_column/ActionColumn";

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Mã",
        dataIndex: "ItemId",
        sorter: (a, b) => a.ItemId.localeCompare(b.ItemId),
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

export function RecycleBin() {
    return (
        <BaseScreen
            screen_title="Thùng rác"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
