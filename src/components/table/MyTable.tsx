import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import MyTableHeader from "./MyTableHeader";
import MyTableBody from "./MyTableBody";
import MyTablePagination from "./MyTablePagination";

export interface MyTableProps {
    data: any[],
    columns: ColumnDef<any>[],
    pageIndex: number,
    pageSize: number,
    action_col: JSX.Element
}

export default function MyTable(props: MyTableProps) {
    const { data, columns, pageIndex, pageSize, action_col } = props
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: pageIndex, //custom initial page index
                pageSize: pageSize, //custom default page size
            },
        },
    });

    return (
        <div>
            <Table>
                <MyTableHeader {...table} />
                <MyTableBody table={table} action_col={action_col} />
            </Table>
            <div>
                <MyTablePagination {...table} />
            </div>
        </div>
    );
}
