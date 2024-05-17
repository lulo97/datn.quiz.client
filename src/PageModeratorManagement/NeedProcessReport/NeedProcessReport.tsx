import { strToDate } from "@/Utils";
import { ActionColumn } from "@/components/action_column/ActionColumn";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { TableColumnsType } from "antd";

const data = [
    {
        ReportId: "663eff0e804ba3071a9734a1",
        ReportReason: "Bất lịch sự",
        ReportTarget: "Đề",
        User: "Hoàng An Toàn",
        ParentId: "663eff0e307554c1b829f6a8",
        Content: "Tôi cảm thấy Bình luận này không chính xác",
        CreatedAt: "18/07/2023",
        IsResolved: false,
        UserResolve: "",
    },
    {
        ReportId: "663eff0ecd299e6602e78eb9",
        ReportReason: "Bất lịch sự",
        ReportTarget: "Đề",
        User: "Trần Thị Bình",
        ParentId: "663eff0e86251ce6574011e0",
        Content: "Tôi cảm thấy Người dùng này không chính xác",
        CreatedAt: "25/11/2023",
        IsResolved: false,
        UserResolve: "",
    },
    {
        ReportId: "663eff0ed47290c6e0c4bbbc",
        ReportReason: "Lỗi kỹ thuật",
        ReportTarget: "Người dùng",
        User: "Phạm Minh Đức",
        ParentId: "663eff0e3f7486fb7af9d5fc",
        Content: "Tôi cảm thấy Đề này không chính xác",
        CreatedAt: "22/02/2023",
        IsResolved: false,
        UserResolve: "Trần Thị Bình",
    },
    {
        ReportId: "663eff0e967604a167ca53e8",
        ReportReason: "Phản cảm",
        ReportTarget: "Người dùng",
        User: "Nguyễn Văn A",
        ParentId: "663eff0e744d729bb064de59",
        Content: "Tôi cảm thấy Người dùng này không chính xác",
        CreatedAt: "07/02/2024",
        IsResolved: false,
        UserResolve: "",
    },
    {
        ReportId: "663eff0ee7eeeb58c6301f5d",
        ReportReason: "Lỗi kỹ thuật",
        ReportTarget: "Người dùng",
        User: "Lê Diễm Hạnh",
        ParentId: "663eff0eb3e2b190f4091462",
        Content: "Tôi cảm thấy Đề này không chính xác",
        CreatedAt: "02/04/2023",
        IsResolved: false,
        UserResolve: "Hoàng An Toàn",
    },
    {
        ReportId: "663eff0e9070373de2798992",
        ReportReason: "Bất lịch sự",
        ReportTarget: "Đề",
        User: "Phạm Minh Đức",
        ParentId: "663eff0ebe5cf6daad8f30b0",
        Content: "Tôi cảm thấy Đề này không chính xác",
        CreatedAt: "13/08/2023",
        IsResolved: false,
        UserResolve: "",
    },
    {
        ReportId: "663eff0e2ac67158ef3881e5",
        ReportReason: "Nội dung không phù hợp",
        ReportTarget: "Bình luận",
        User: "Lê Diễm Hạnh",
        ParentId: "663eff0e74ecce67d3f30d59",
        Content: "Tôi cảm thấy Bình luận này không chính xác",
        CreatedAt: "15/09/2023",
        IsResolved: false,
        UserResolve: "Hoàng An Toàn",
    },
    {
        ReportId: "663eff0e28b7a4216c6c401f",
        ReportReason: "Nội dung không phù hợp",
        ReportTarget: "Bình luận",
        User: "Hoàng An Toàn",
        ParentId: "663eff0e3a9b85e4e5621692",
        Content: "Tôi cảm thấy Đề này không chính xác",
        CreatedAt: "16/06/2023",
        IsResolved: false,
        UserResolve: "",
    },
    {
        ReportId: "663eff0e9cf8b45680330143",
        ReportReason: "Spam",
        ReportTarget: "Đề",
        User: "Trần Thị Bình",
        ParentId: "663eff0e16f0831a5e323857",
        Content: "Tôi cảm thấy Đề này không chính xác",
        CreatedAt: "30/12/2023",
        IsResolved: false,
        UserResolve: "Nguyễn Văn A",
    },
    {
        ReportId: "663eff0e696527e32d2533db",
        ReportReason: "Nội dung không phù hợp",
        ReportTarget: "Người dùng",
        User: "Lê Diễm Hạnh",
        ParentId: "663eff0e6f16238d4ff845dc",
        Content: "Tôi cảm thấy Bình luận này không chính xác",
        CreatedAt: "15/11/2023",
        IsResolved: false,
        UserResolve: "Lê Diễm Hạnh",
    },
];

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Lý do",
        dataIndex: "ReportReason",
        sorter: (a, b) => a.ReportReason.localeCompare(b.ReportReason)
    },
    {
        title: "Người báo cáo",
        dataIndex: "User",
        sorter: (a, b) => a.User.localeCompare(b.User),
    },
    {
        title: "Mã đối tượng báo cáo",
        dataIndex: "ParentId",
        sorter: (a, b) => a.ParentId.localeCompare(b.ParentId),
    },
    {
        title: "Ngày báo cáo dõi",
        dataIndex: "CreatedAt",
        sorter: (a, b) =>
            strToDate(a.CreatedAt).getTime() -
            strToDate(b.CreatedAt).getTime(),
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
            <ActionColumn isDelete isRead isSend />
        </div>
    ),
    width: "10%",
});

export function NeedProcessReport() {
    return (
        <BaseScreen
            screen_title="Báo cáo cần xử lý"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
