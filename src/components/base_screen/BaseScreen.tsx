import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableColumnsType } from "antd";
import { getObjectId } from "@/Utils";
import { Pagination, Table } from "antd";
import { useState } from "react";

interface BaseScreen {
    columns: TableColumnsType<any>, 
    data: any[], 
    defaultPageSize: number, 
    screen_title: string, 
    addModal: JSX.Element
}

export function BaseScreen(props: BaseScreen) {
    const { columns, data, defaultPageSize, screen_title, addModal } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = defaultPageSize;

    // Calculate the start and end index of the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data.length);
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="h-1/6">
                <div className="flex justify-between">
                    <CardTitle>{screen_title}</CardTitle>
                    {addModal}
                </div>
            </CardHeader>
            <CardContent className="h-5/6">
                <div className="border rounded-md shadow h-full flex flex-col justify-between items-end">
                    <Table
                        className="w-full"
                        columns={columns}
                        dataSource={currentPageData}
                        showSorterTooltip={{ target: "sorter-icon" }}
                        pagination={false}
                        rowKey={(_record) => getObjectId()}
                    />
                    <Pagination
                        className="mr-5 mb-5 mt-2"
                        total={data.length}
                        defaultCurrent={1}
                        current={currentPage} // Pass current page state
                        defaultPageSize={defaultPageSize}
                        onChange={(page: number) => setCurrentPage(page)} // Handle page change event
                        showQuickJumper={true}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
