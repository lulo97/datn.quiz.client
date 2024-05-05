import { QuestionTableProps } from "@/Interfaces";
import { Button } from "@/components/ui/button";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { SquarePen, Eye } from "lucide-react";

export default function QuestionTableBody(table: QuestionTableProps) {
    return (
        <TableBody>
            {table.getRowModel().rows.map((row) => {
                return (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                            return (
                                <TableCell key={cell.id}>
                                    <p
                                        className={`line-clamp-1 ${
                                            cell.getContext().column.id ==
                                            "Content"
                                                ? `w-[200px]`
                                                : ""
                                        }`}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </p>
                                </TableCell>
                            );
                        })}
                        <TableCell className="flex justify-between">
                            <Button>
                                <SquarePen />
                            </Button>
                            <Button>
                                <Eye />
                            </Button>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}