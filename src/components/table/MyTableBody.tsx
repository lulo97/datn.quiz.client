import { Table as TanstackTable } from "@tanstack/react-table";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

interface MyTableBodyProps {
    table: TanstackTable<any>, 
    action_col: JSX.Element,
}

export default function MyTableBody(props: MyTableBodyProps) {
    const { table, action_col } = props
    return (
        <TableBody>
            {table.getRowModel().rows.map((row) => {
                return (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                            return (
                                <TableCell key={cell.id}>
                                    <p>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </p>
                                </TableCell>
                            );
                        })}
                        {action_col}
                    </TableRow>
                );
            })}
        </TableBody>
    );
}