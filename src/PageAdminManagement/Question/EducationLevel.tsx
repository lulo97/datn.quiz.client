import { strToDate } from "@/Utils";
import { TableColumnsType } from "antd";
import BaseScreen from "../../components/base_screen/BaseScreen";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    { Name: "Lớp 1", Description: "Lớp 1", CreateAt: "07/05/2024" },
    { Name: "Lớp 2", Description: "Lớp 2", CreateAt: "02/03/2023" },
    { Name: "Lớp 3", Description: "Lớp 3", CreateAt: "05/09/2008" },
    { Name: "Lớp 4", Description: "Lớp 4", CreateAt: "10/08/2000" },
    { Name: "Lớp 5", Description: "Lớp 5", CreateAt: "04/12/2003" },
    { Name: "Lớp 6", Description: "Lớp 6", CreateAt: "07/08/2001" },
    { Name: "Lớp 7", Description: "Lớp 7", CreateAt: "14/08/2022" },
    { Name: "Lớp 8", Description: "Lớp 8", CreateAt: "27/12/2021" },
    { Name: "Lớp 9", Description: "Lớp 9", CreateAt: "17/08/2000" },
    { Name: "Lớp 10", Description: "Lớp 10", CreateAt: "27/06/2015" },
    { Name: "Lớp 11", Description: "Lớp 11", CreateAt: "07/11/2014" },
    { Name: "Lớp 12", Description: "Lớp 12", CreateAt: "29/04/2000" },
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
            <ActionColumn isDelete={true} isRead={true} isUpdate={true} />
        </div>
    ),
    width: "10%",
});

export default function EducationLevel() {
    return (
        <BaseScreen
            screen_title="Trình độ câu hỏi"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
