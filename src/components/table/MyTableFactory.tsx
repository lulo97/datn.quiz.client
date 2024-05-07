import { Table as TanstackTable } from "@tanstack/react-table";
import MyTable from "@/components/table/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { property } from "lodash";

interface ColumnData {
    accessor: string;
    header: string;
}

export default function MyTableFactory(
    data: any[],
    columns_data: ColumnData[],
    page_index: number,
    page_size: number,
    action_col: JSX.Element
) {
    const columnHelper = createColumnHelper<TanstackTable<(typeof data)[0]>>();

    const columns = columns_data.map((ele) =>
        columnHelper.accessor(property(ele.accessor), {
            header: ele.header,
        })
    );

    const mytable_data = {
        data: data,
        columns: columns,
        pageIndex: page_index,
        pageSize: page_size,
        action_col: action_col,
    };

    return <MyTable {...mytable_data} />
}
