import {
    getRandomAvatar,
} from "@/Utils";
import { AntdTable } from "@/components/antd_table/AntdTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { TableColumnsType } from "antd";

const data = [
    {
        Username: "Nguyễn Thị Hằng",
        AvatarUrl: getRandomAvatar(),
        Score: 1305,
        TimeTaken: 56,
        TotalCorrectAnswer: 15,
    },
    {
        Username: "Trần Văn Đức",
        AvatarUrl: getRandomAvatar(),
        Score: 1412,
        TimeTaken: 63,
        TotalCorrectAnswer: 16,
    },
    {
        Username: "Lê Thị Thu",
        AvatarUrl: getRandomAvatar(),
        Score: 1258,
        TimeTaken: 44,
        TotalCorrectAnswer: 14,
    },
    {
        Username: "Ngô Minh Trang",
        AvatarUrl: getRandomAvatar(),
        Score: 1367,
        TimeTaken: 72,
        TotalCorrectAnswer: 15,
    },
    {
        Username: "Phạm Quang Huy",
        AvatarUrl: getRandomAvatar(),
        Score: 1276,
        TimeTaken: 51,
        TotalCorrectAnswer: 14,
    },
    {
        Username: "Bùi Thị Loan",
        AvatarUrl: getRandomAvatar(),
        Score: 1349,
        TimeTaken: 68,
        TotalCorrectAnswer: 15,
    },
    {
        Username: "Vũ Minh Tuấn",
        AvatarUrl: getRandomAvatar(),
        Score: 1440,
        TimeTaken: 83,
        TotalCorrectAnswer: 16,
    },
    {
        Username: "Đặng Thị Lan",
        AvatarUrl: getRandomAvatar(),
        Score: 1221,
        TimeTaken: 37,
        TotalCorrectAnswer: 13,
    },
    {
        Username: "Hoàng Văn Hùng",
        AvatarUrl: getRandomAvatar(),
        Score: 1385,
        TimeTaken: 75,
        TotalCorrectAnswer: 15,
    },
    {
        Username: "Trần Thị Thảo",
        AvatarUrl: getRandomAvatar(),
        Score: 1324,
        TimeTaken: 59,
        TotalCorrectAnswer: 15,
    },
];

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Người dùng",
        dataIndex: "Username",
        sorter: (a, b) => a.Username.localeCompare(b.Username),
        render: (_item, record, _index) => (
            <div className="w-fit flex gap-2 items-center">
                <Avatar className="border">
                    <AvatarImage src={getRandomAvatar()} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="font-bold">{record.Username}</div>
            </div>
        ),
    },
    {
        title: "Điểm",
        dataIndex: "Score",
        sorter: (a, b) => a.Score - b.Score,
    },
    {
        title: "Thời gian",
        dataIndex: "TimeTaken",
        sorter: (a, b) => a.TimeTaken - b.TimeTaken,
    },
    {
        title: "Số câu đúng",
        dataIndex: "TotalCorrectAnswer",
        sorter: (a, b) => a.TotalCorrectAnswer - b.TotalCorrectAnswer,
    },
];

columns.unshift({
    title: "Hạng",
    dataIndex: "Hạng",
    render: (_item, record, _index) => <div>{data.indexOf(record) + 1}</div>,
    width: "5%",
});

export function Content() {
    return (
        <div>
            <Label>Bảng xếp hạng</Label>
            <AntdTable columns={columns} data={data} defaultPageSize={5} />
        </div>
    );
}
