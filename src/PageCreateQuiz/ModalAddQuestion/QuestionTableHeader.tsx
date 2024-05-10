import { QuestionTableProps } from "@/Interfaces";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

export function QuestionTableHeader(table: QuestionTableProps) {
    return (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
                return (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            );
                        })}
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                );
            })}
        </TableHeader>
    );
}
