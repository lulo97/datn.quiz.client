import { AntdTable } from "@/components/antd_table/AntdTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableColumnsType } from "antd";

interface BaseScreenProps {
    screen_title: string;
    columns: TableColumnsType<any>;
    data: any[];
    defaultPageSize: number;
}

export function BaseScreen(props: BaseScreenProps) {
    const { screen_title, columns, data, defaultPageSize } = props;
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="h-1/6">
                <div className="flex justify-between">
                    <CardTitle>{screen_title}</CardTitle>
                    <Button>Thêm</Button>
                </div>
            </CardHeader>
            <CardContent className="h-5/6">
                <AntdTable
                    columns={columns}
                    data={data}
                    defaultPageSize={defaultPageSize}
                />
            </CardContent>
        </Card>
    );
}
