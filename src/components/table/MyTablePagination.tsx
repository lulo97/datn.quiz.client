import { Table as TanstackTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import { Label } from "@radix-ui/react-label";
import {
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function MyTablePagination(table: TanstackTable<any>) {
    return (
        <Pagination className="flex justify-end">
            <PaginationContent>
                <PaginationItem className="mr-10">
                    <Label>
                        Trang {table.getState().pagination.pageIndex + 1} trên{" "}
                        {table.getPageCount()}
                    </Label>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        disabled={!table.getCanPreviousPage()}
                        className="shadow"
                        variant="outline"
                        size="sm"
                        onClick={() => table.firstPage()}
                    >
                        <ChevronFirst />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        className="shadow"
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        className="shadow"
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        className="shadow"
                        variant="outline"
                        size="sm"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronLast />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
