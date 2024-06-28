import { AntdTable } from "@/components/antd_table/AntdTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { TableColumnsType } from "antd";
import { Ranking, getDataForContent } from "../Utils";

export function Content(rankData: Ranking) {
    const data = getDataForContent(rankData);
    const TotalScore = rankData.Quiz.Questions.map(
        (question) => question.Point?.Value || 0
    ).reduce((acc, curr) => acc + curr, 0);

    type DataType = (typeof data)[0];

    const columns: TableColumnsType<DataType> = [
        {
            title: "Người dùng",
            dataIndex: "Username",
            sorter: true,
            render: (_item, record, _index) => (
                <div className="w-fit flex gap-2 items-center">
                    <Avatar className="border">
                        <AvatarImage src={record?.ImageUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="font-bold">{record?.Username}</div>
                </div>
            ),
        },
        {
            title: "Điểm",
            dataIndex: "Score",
            sorter: true,
            render: (_item, record, _index) => (
                <div>
                    {record?.Score}/{TotalScore}
                </div>
            ),
        },
        {
            title: "Thời gian",
            dataIndex: "TimeTaken",
            sorter: true,
            render: (_item, record, _index) => (
                <div>
                    {record?.TimeTaken}/{rankData.Quiz.Time? rankData.Quiz.Time.Value * 60 : 0}
                </div>
            ),
        },
        {
            title: "Số câu đúng",
            dataIndex: "TotalCorrectAnswer",
            sorter: true,
            render: (_item, record, _index) => (
                <div>
                    {record?.TotalCorrectAnswer}/{rankData.Quiz.Questions.length}
                </div>
            ),
        },
    ];

    columns.unshift({
        title: "Hạng",
        dataIndex: "Hạng",
        render: (_item, record, _index) => (
            <div>{data.indexOf(record) + 1}</div>
        ),
        width: "5%",
    });

    return (
        <div>
            <Label>Bảng xếp hạng</Label>
            <AntdTable columns={columns} data={data} defaultPageSize={5} />
        </div>
    );
}
