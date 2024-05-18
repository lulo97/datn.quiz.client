import { strToDate } from "@/Utils";
import { ActionColumn } from "@/components/action_column/ActionColumn";
import { TableColumnsType } from "antd";

export const data = [
    {
        Name: "Tạo 100 đề",
        Description: "Người dùng tạo 100 đề",
        CreateAt: "07/05/2024",
    },
    {
        Name: "Làm 100 đề",
        Description: "Người dùng làm 100 đề",
        CreateAt: "02/03/2023",
    },
    {
        Name: "Đạt 90 điểm",
        Description: "Người dùng đạt 90 điểm trong bài kiểm tra",
        CreateAt: "10/10/2023",
    },
    {
        Name: "Thành tích top 10",
        Description: "Người dùng đạt top 10 trong cuộc thi",
        CreateAt: "15/11/2023",
    },
    {
        Name: "Hoàn thành 50 câu hỏi",
        Description: "Người dùng đã hoàn thành 50 câu hỏi trong 1 giờ",
        CreateAt: "20/12/2023",
    },
    // Add more achievements here
    {
        Name: "Thành tích hàng tháng",
        Description: "Người dùng đạt thành tích hàng tháng",
        CreateAt: "01/01/2024",
    },
    {
        Name: "Hoàn thành mục tiêu năm",
        Description: "Người dùng hoàn thành mục tiêu năm trong bài kiểm tra",
        CreateAt: "05/02/2024",
    },
    {
        Name: "Vượt qua 10 bài kiểm tra",
        Description: "Người dùng vượt qua 10 bài kiểm tra khó",
        CreateAt: "10/03/2024",
    },
    {
        Name: "Thành tích hàng tuần",
        Description: "Người dùng đạt thành tích hàng tuần",
        CreateAt: "15/04/2024",
    },
    {
        Name: "Hoàn thành khóa học",
        Description: "Người dùng hoàn thành khóa học trên nền tảng",
        CreateAt: "20/05/2024",
    },
];

export type DataType = (typeof data)[0];

export const columns: TableColumnsType<DataType> = [
    {
        title: "Tên",
        dataIndex: "Name",
        sorter: true,
    },
    {
        title: "Mô tả",
        dataIndex: "Description",
        sorter: true,
    },
    {
        title: "Ngày tạo",
        dataIndex: "CreateAt",
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
            <ActionColumn isDelete isRead isUpdate />
        </div>
    ),
    width: "10%",
});
