import { Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";

interface AntdTableProps {
    columns: TableColumnsType<any>;
    data: any[];
    defaultPageSize: number;
}

export default function AntdTable(props: AntdTableProps) {
    const { columns, data, defaultPageSize } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = defaultPageSize;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate the start and end index of the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data.length);

    // Slice the data to display only the items for the current page
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <div className="border rounded-md shadow h-full flex flex-col justify-between items-end">
            <Table
                className="w-full"
                columns={columns}
                dataSource={currentPageData}
                showSorterTooltip={{ target: "sorter-icon" }}
                pagination={false}
            />
            <Pagination
                className="mr-5 mb-5"
                total={data.length}
                defaultCurrent={1}
                current={currentPage} // Pass current page state
                defaultPageSize={defaultPageSize}
                onChange={handlePageChange} // Handle page change event
                showQuickJumper={true}
            />
        </div>
    );
}
