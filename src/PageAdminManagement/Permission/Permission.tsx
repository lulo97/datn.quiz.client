import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { useState, useEffect, useMemo } from "react";
import { AddModal } from "./AddModal";
import { getAll } from "./API";
import { toDDMMYYY } from "@/Utils";
import { TableColumnsType } from "antd";
import { DeleteModal } from "./DeleteModal";
import { ReadModal } from "./ReadModal";
import { UpdateModal } from "./UpdateModal";
import { PermissionDetail } from "./Utils";

export function Permission() {
    const [data, setData] = useState<PermissionDetail[]>([]);

    async function fetchData() {
        const data_fetched = await getAll();
        setData(data_fetched);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const columns: TableColumnsType<PermissionDetail> = useMemo(
        () => [
            {
                title: "Quyền",
                dataIndex: "Name",
                sorter: true,
                width: "20%",
            },
            {
                title: "Vai trò",
                sorter: true,
                width: "20%",
                render: (_item, record, _index) => (
                    <div>{record.Role ? record.Role.Name : "NULL"}</div>
                ),
            },
            {
                title: "Mô tả",
                dataIndex: "Description",
                sorter: true,
                render: (_item, record, _index) => (
                    <div className="line-clamp-1">
                        {record.Description || "NULL"}
                    </div>
                ),
            },
            {
                title: "Ngày tạo",
                dataIndex: "CreatedAt",
                sorter: true,
                render: (_item, record, _index) => toDDMMYYY(record.CreatedAt),
                width: "15%",
            },
            {
                title: "Hành động",
                key: "action",
                render: (_item, _record, _index) => (
                    <div className="flex gap-2 justify-end">
                        <DeleteModal record={_record} fetchData={fetchData} />
                        <ReadModal record={_record} fetchData={fetchData} />
                        <UpdateModal record={_record} fetchData={fetchData} />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchData]
    );
    return (
        <BaseScreen
            screen_title="Quyền"
            columns={columns}
            data={data}
            defaultPageSize={5}
            addModal={<AddModal fetchData={fetchData} />}
        />
    );
}
