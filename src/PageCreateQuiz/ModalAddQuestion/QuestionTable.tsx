import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import { data } from "./MockData";
import { QuestionTableHeader } from "./QuestionTableHeader";
import { QuestionTableBody } from "./QuestionTableBody";
import { columns } from "./MockColumns";
import { QuestionTablePagination } from "./QuestionTablePagination";

export function QuestionTable() {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0, //custom initial page index
                pageSize: 4, //custom default page size
            },
        },
    });

    return (
        <div>
            <Table>
                <QuestionTableHeader {...table} />
                <QuestionTableBody {...table} />
            </Table>
            <div>
                <QuestionTablePagination {...table} />
            </div>
        </div>
    );
}
