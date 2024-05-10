import { getObjectId, getRandomDate, strToDate } from "@/Utils";
import ActionColumn from "@/components/action_column/ActionColumn";
import BaseScreen from "@/components/base_screen/BaseScreen";
import { TableColumnsType } from "antd";

const data = [
    {
        FollowId: getObjectId(),
        FollowerId: getObjectId(),
        FolloweeId: getObjectId(),
        FollowDate: getRandomDate(),
    },
    {
        FollowId: getObjectId(),
        FollowerId: getObjectId(),
        FolloweeId: getObjectId(),
        FollowDate: getRandomDate(),
    },
    {
        FollowId: getObjectId(),
        FollowerId: getObjectId(),
        FolloweeId: getObjectId(),
        FollowDate: getRandomDate(),
    },
    {
        FollowId: getObjectId(),
        FollowerId: getObjectId(),
        FolloweeId: getObjectId(),
        FollowDate: getRandomDate(),
    },
];

type DataType = (typeof data)[0];

const columns: TableColumnsType<DataType> = [
    {
        title: "Ngày theo dõi",
        dataIndex: "FollowDate",
        sorter: (a, b) =>
            strToDate(a.FollowDate).getTime() -
            strToDate(b.FollowDate).getTime(),
    },
    {
        title: "Người dùng",
        dataIndex: "FolloweeId",
        sorter: (a, b) => a.FolloweeId.localeCompare(b.FolloweeId),
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

export default function Follower() {
    return (
        <BaseScreen
            screen_title="Người theo dõi bạn"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
