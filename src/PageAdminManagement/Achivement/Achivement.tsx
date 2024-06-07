import { AddModal } from "./AddModal";
import { useState, useEffect, useMemo } from "react";
import { TableColumnsType } from "antd";
import { Achievement as IAchievement } from "@/InterfacesDatabase";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { getAll } from "./UtilApi";
import { DeleteModal } from "./DeleteModal";
import { ReadModal } from "./ReadModal";
import { UpdateModal } from "./UpdateModal";
import { getImgPath, toDDMMYYY } from "@/Utils";

export function Achievement() {
    const [data, setData] = useState<IAchievement[]>([]);

    async function fetchData() {
        const data_fetched = await getAll();
        setData(data_fetched);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data.length);
    }, [data]);

    const columns: TableColumnsType<IAchievement> = useMemo(
        () => [
            {
                title: "Ảnh",
                dataIndex: "ImageUrl",
                render: (_item, record, _index) => (
                    <img
                        className="object-contain w-8"
                        src={getImgPath(record.ImageUrl)}
                    ></img>
                ),
            },
            {
                title: "Tên",
                dataIndex: "Name",
                sorter: true,
                width: "20%",
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
            screen_title="Thành tựu"
            columns={columns}
            data={data}
            defaultPageSize={5}
            addModal={<AddModal fetchData={fetchData} />}
        />
    );
}
