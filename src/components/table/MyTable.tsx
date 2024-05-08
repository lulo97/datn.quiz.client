import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import MyTableHeader from "./MyTableHeader";
import MyTableBody from "./MyTableBody";
import MyTablePagination from "./MyTablePagination";
import { MyTableProps } from "@/Interfaces";

export default function MyTable(props: MyTableProps) {
    const { data, columns, page_index, page_size, action_col, header_class_condition } =
        props;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: page_index, //custom initial page index
                pageSize: page_size, //custom default page size
            },
        },
    });

    return (
        <div className="min-h-full flex flex-col justify-between">
            <Table>
                <MyTableHeader table={table} header_class_condition={header_class_condition} />
                <MyTableBody table={table} action_col={action_col} />
            </Table>
            <div>
                <MyTablePagination {...table} />
            </div>
        </div>
    );
}
