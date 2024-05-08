import BaseScreen from "../BaseScreen";
import { getObjectId, getRandomDate } from "@/Utils";
import ActionColumn from "@/components/action_column/ActionColumn";

const data = [
    {
        FollowId: getObjectId(),
        FollowerId: getObjectId(),
        FolloweeId: getObjectId(),
        FollowDate: getRandomDate()
    },
    {
        FollowId: getObjectId(),
        FollowerId: getObjectId(),
        FolloweeId: getObjectId(),
        FollowDate: getRandomDate()
    },
    {
        FollowId: getObjectId(),
        FollowerId: getObjectId(),
        FolloweeId: getObjectId(),
        FollowDate: getRandomDate()
    },
    {
        FollowId: getObjectId(),
        FollowerId: getObjectId(),
        FolloweeId: getObjectId(),
        FollowDate: getRandomDate()
    },
];

const columns_data = [
    { accessor: "FollowDate", header: "Ngày theo dõi" },
    { accessor: "FolloweeId", header: "Người dùng" },
];

const action_col = <ActionColumn isDelete={true} isRead={true} isUpdate={false} />

const header_class_condition = [{}];

export default function Followee() {
    const mtf_props = {
        data: data,
        columns_data: columns_data,
        page_index: 0,
        page_size: 7,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <BaseScreen screen_title="Người bạn theo dõi" mtf_props={mtf_props} />;
}
