import { useMemo } from "react";
import { TableColumnsType, TableProps } from "antd";
import { GetAllOptions, SubSubjectDetail, getAll } from "./UtilApi";
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
                width: "25%",
                render: (_, record) => (
                    <div className="line-clamp-1">{record.Name}</div>
                ),
            },
            {
                title: "Chủ đề",
                sorter: true,
                render: (_item, record, _index) => (
                    <div className="line-clamp-1">{record.Subject?.Name}</div>
                ),
                width: "20%",
            },
            {
                title: "Trình độ học vấn",
                sorter: true,
                render: (_item, record, _index) => (
                    <div className="line-clamp-1">
                        {record.EducationLevel?.Name}
                    </div>
                ),
                width: "20%",
            },
            {
                title: "Mô tả",
                dataIndex: "Description",
                sorter: true,
                render: (_, record) => (
                    <div className="line-clamp-1">
                        {record.Description || "NULL"}
                    </div>
                ),
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

export function getOnChange(
    setData: React.Dispatch<React.SetStateAction<SubSubjectDetail[]>>
) {
    const onChange: TableProps<SubSubjectDetail>["onChange"] = async (
        _pagination,
        filters,
        sorter
    ) => {
        if (Array.isArray(sorter)) return;
        //column, field, order, columnKey
        const { field, order } = sorter;
        const options: GetAllOptions = {};
        if (field && order) {
            const _order = order == "ascend" ? "asc" : "desc";
            options.sortField = field.toString();
            options.sortDirection = _order;
        }
        if (filters.SubjectName) {
            options.filterFields = filters.SubjectName;
        }
        setData(await getAll(options));
    };
    return onChange;
}
