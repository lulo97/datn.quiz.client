import { Table as TanstackTable } from "@tanstack/react-table";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

interface MyTableHeader {
    
}

export default function MyTableHeader(table: TanstackTable<any>) {
    return (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
                return (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            let class_name = ""
                            if (header.getContext().column.id == "STT") {
                                class_name = "w-12"
                            }
                            return (
                                <TableHead className={class_name} key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            );
                        })}
                        <TableHead className="w-36 text-end">Hành động</TableHead>
                    </TableRow>
                );
            })}
        </TableHeader>
    );
}