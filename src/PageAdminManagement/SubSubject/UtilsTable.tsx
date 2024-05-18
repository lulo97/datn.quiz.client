import React, { useMemo } from "react";
import { TableColumnsType, TableProps } from "antd";
import { toDDMMYYY } from "@/Utils";
import { SubSubjectDetail } from "./UtilApi";
import { DeleteModal } from "./DeleteModal";
import { ReadModal } from "./ReadModal";
import { UpdateModal } from "./UpdateModal";

export function getColumns(fetchData: () => Promise<void>) {
    const columns: TableColumnsType<SubSubjectDetail> = useMemo(
        () => [
            {
                title: "Chủ đề phụ",
                dataIndex: "Name",
                sorter: true,
                width: "30%",
                render: (_, record) => (
                    <div className="line-clamp-1">{record.Name}</div>
                ),
            },
            {
                title: "Chủ đề",
                dataIndex: "SubjectName",
                sorter: (a, b) => a.SubjectName.localeCompare(b.SubjectName),
                width: "20%",
            },
            {
                title: "Mô tả",
                dataIndex: "Description",
                sorter: (a, b) => a.Description.localeCompare(b.Description),
                render: (_, record) => (
                    <div className="line-clamp-1">{record.Description}</div>
                ),
            },
            {
                title: "Ngày tạo",
                dataIndex: "CreatedAt",
                sorter: (a, b) =>
                    new Date(a.CreatedAt).getTime() -
                    new Date(b.CreatedAt).getTime(),
                render: (_, record) => toDDMMYYY(record.CreatedAt),
                width: "15%",
            },
            {
                title: "Hành động",
                key: "action",
                render: (_, record) => (
                    <div className="flex gap-2 justify-end">
                        <DeleteModal record={record} fetchData={fetchData} />
                        <ReadModal record={record} fetchData={fetchData} />
                        <UpdateModal record={record} fetchData={fetchData} />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchData]
    );
    return columns;
}

export function getSorter(
    data: SubSubjectDetail[],
    setData: React.Dispatch<React.SetStateAction<SubSubjectDetail[]>>,
    fetchData: () => Promise<void>
) {
    const handleTableChange: TableProps<SubSubjectDetail>["onChange"] = (
        _pagination,
        _filters,
        sorter
    ) => {
        if (Array.isArray(sorter)) return;
        if (sorter.field === "Name") {
            const sortedData = [...data].sort((a, b) =>
                sorter.order === "ascend"
                    ? a.Name.localeCompare(b.Name)
                    : b.Name.localeCompare(a.Name)
            );
            setData(sortedData);
        } else {
            fetchData();
        }
    };
    return handleTableChange;
}