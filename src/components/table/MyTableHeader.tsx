import { Table as TanstackTable } from "@tanstack/react-table";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { TableHeaderClassContidion } from "@/Interfaces";

interface MyTableHeader {
    table: TanstackTable<any>;
    header_class_condition: TableHeaderClassContidion[];
}

export default function MyTableHeader(props: MyTableHeader) {
    const { table, header_class_condition } = props;
    return (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
                return (
                    <TableRow key={headerGroup.id}>
                        <TableHead className="w-16 text-start">
                            STT
                        </TableHead>
                        {headerGroup.headers.map((header) => {
                            let header_class = "";
                            header_class_condition.map((ele) => {
                                if (
                                    header.getContext().column.id == ele.header
                                ) {
                                    header_class = ele.class;
                                }
                            });
                            return (
                                <TableHead
                                    className={header_class}
                                    key={header.id}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            );
                        })}
                        <TableHead className="min-w-24 text-end">
                            Hành động
                        </TableHead>
                    </TableRow>
                );
            })}
        </TableHeader>
    );
}
