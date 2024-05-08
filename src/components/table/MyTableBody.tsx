import { Table as TanstackTable } from "@tanstack/react-table";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

interface MyTableBodyProps {
    table: TanstackTable<any>;
    action_col: JSX.Element;
}

export default function MyTableBody(props: MyTableBodyProps) {
    const { table, action_col } = props;
    return (
        <TableBody>
            {table.getRowModel().rows.map((row, idx) => {
                return (
                    <TableRow key={row.id}>
                        <TableCell>{idx + 1}</TableCell>
                        {row.getVisibleCells().map((cell) => {
                            return (
                                <TableCell key={cell.id}>
                                    <p className="line-clamp-1">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </p>
                                </TableCell>
                            );
                        })}
                        <TableCell className="flex justify-end gap-3">
                            {action_col}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}
