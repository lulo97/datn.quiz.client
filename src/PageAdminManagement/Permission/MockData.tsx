import { strToDate } from "@/Utils";
import ActionColumn from "@/components/action_column/ActionColumn";
import { TableColumnsType } from "antd";

export const data = [
    {
        Name: "Xóa người dùng",
        Description: "Người dùng có thể xóa người dùng khác",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Xem báo cáo",
        Description: "Người dùng có thể xem các báo cáo được gửi về",
        CreateAt: "02/03/2023",
    },
];

export type DataType = (typeof data)[0];

export const columns: TableColumnsType<DataType> = [
    {
        title: "Tên",
        dataIndex: "Name",
        sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
        title: "Mô tả",
        dataIndex: "Description",
        sorter: (a, b) => a.Description.localeCompare(b.Description),
    },
    {
        title: "Ngày tạo",
        dataIndex: "CreateAt",
        sorter: (a, b) =>
            strToDate(a.CreateAt).getTime() - strToDate(b.CreateAt).getTime(),
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