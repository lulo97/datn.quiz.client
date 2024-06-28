import { TableColumnsType } from "antd";
import { BaseScreen } from "../../components/base_screen/BaseScreen";
import { Eye, X } from "lucide-react";
import {
    PropsScanAnswerSheet,
    UserResponseDetail,
    getScore,
} from "../Utils/Utils";

export function ASRTable(props: PropsScanAnswerSheet) {
    const { dataASR } = props;

    const columns: TableColumnsType<UserResponseDetail> = [
        {
            title: "Mã người thi",
            dataIndex: "STT",
            sorter: true,
        },
        {
            title: "Số câu đúng",
            sorter: true,
            render: (_item, record, _index) => getScore(record),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_item, _record, _index) => (
                <div className="flex gap-2 justify-end">
                    <Eye className="text-yellow-500 hover:text-yellow-600" />
                    <X className="text-red-500 hover:text-red-600" />
                </div>
            ),
            width: "10%",
        },
    ];

    return (
        <BaseScreen
            screen_title="Kết quả thi"
            columns={columns}
            data={dataASR}
            defaultPageSize={5}
        />
    );
}
