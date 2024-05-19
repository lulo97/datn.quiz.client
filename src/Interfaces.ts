export type QuestionTableDataType = {
    STT: number;
    Content: string;
    Type: string;
    Difficult: string;
    Subject: string;
    SubSubject: string;
    EducationLevel: string;
};

import { ColumnDef, Table as TanstackTable } from "@tanstack/react-table";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

export type QuestionTableProps = TanstackTable<QuestionTableDataType>;

export interface TableHeaderClassContidion {
    header: string;
    class: string;
}

export interface BaseTableProps {
    data: any[];
    page_index: number;
    page_size: number;
    action_col: JSX.Element;
    header_class_condition: TableHeaderClassContidion[] | any[];
}

export interface MyTableProps extends BaseTableProps {
    columns: ColumnDef<any>[];
}

interface ColumnsData {
    accessor: string;
    header: string;
}

export interface MyTableFactoryProps extends BaseTableProps {
    columns_data: ColumnsData[];
}

export interface MenuItem {
    name: string;
    element?: JSX.Element | string;
    child?: MenuItem[];
}

export type MenuClickTarget = React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>

export interface NavbarProps {
    handleMenubarClick: (event: MenuClickTarget) => void,
    menu_names: MenuItem[]
}

export type OnChangeAntd = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) => void