import { strToDate } from "@/Utils";
import { TableColumnsType } from "antd";
import { BaseScreen } from "../../components/base_screen/BaseScreen";
import { ActionColumn } from "@/components/action_column/ActionColumn";

const data = [
    {
        Name: "Người dùng",
        Description: "Người dùng cơ bản của hệ thống",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Người kiểm duyệt",
        Description: "Người kiểm duyệt nội dung trên hệ thống",
        CreateAt: "02/03/2023",
    },
];

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
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
            <ActionColumn isDelete isRead isUpdate />{" "}
        </div>
    ),
    width: "10%",
});

export function Role() {
    return (
        <BaseScreen
            screen_title="Vai trò người dùng"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
