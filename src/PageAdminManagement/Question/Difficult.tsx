import { TableColumnsType } from "antd";
import BaseScreen from "../../components/base_screen/BaseScreen";
import ActionColumn from "@/components/action_column/ActionColumn";
import { strToDate } from "@/Utils";

const data = [
    {
        Name: "Nhận biết",
        Description: "Nhận biết, nhắc lại được kiến thức, kĩ năng đã học.",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Thông hiểu",
        Description:
            "Hiểu kiến thức, kĩ năng đã học. trình bày, giải thích được kiến thức theo cách hiểu của cá nhân.",
        CreateAt: "02/03/2023",
    },
    {
        Name: "Vận dụng",
        Description:
            "Biết vận dụng kiến thức, kĩ năng đã học để giải quyết những vấn dề quen thuộc, tương tự trong học tập, cuộc sống.",
        CreateAt: "05/09/2008",
    },
    {
        Name: "Vận dụng cao",
        Description:
            "Vận dụng các kiến thức, kĩ năng đã học để giải quyết vấn đề mới hoặc đưa ra những phản hồi hợp lý trong học tập, cuộc sống một cách linh hoạt.",
        CreateAt: "05/09/2008",
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
            <ActionColumn isDelete={true} isRead={true} isUpdate={true} />
        </div>
    ),
    width: "10%",
});

export default function Difficult() {
    return (
        <BaseScreen
            screen_title="Độ khó câu hỏi"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
