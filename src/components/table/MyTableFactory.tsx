import { Table as TanstackTable } from "@tanstack/react-table";
import MyTable from "@/components/table/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { property } from "lodash";
import { MyTableFactoryProps } from "@/Interfaces";

export default function MyTableFactory(props: MyTableFactoryProps) {
    
    const {
        data,
        columns_data,
        page_index,
        page_size,
        action_col,
        header_class_condition,
    } = props;

    const columnHelper = createColumnHelper<TanstackTable<(typeof data)[0]>>();

    const columns = columns_data.map((ele) =>
        columnHelper.accessor(property(ele.accessor), {
            header: ele.header,
        })
    );

    const mytable_data = {
        data: data,
        columns: columns,
        page_index: page_index,
        page_size: page_size,
        action_col: action_col,
        header_class_condition: header_class_condition,
    };

    return <MyTable {...mytable_data} />;
}
