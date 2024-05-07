import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { PenBox, X } from "lucide-react";
import MyTableFactory from "@/components/table/MyTableFactory";

const data = [
    { STT: 1, Name: "Lớp 1", Description: "Lớp 1", CreateAt: "07/05/2024" },
    { STT: 2, Name: "Lớp 2", Description: "Lớp 2", CreateAt: "02/03/2023" },
    { STT: 3, Name: "Lớp 3", Description: "Lớp 3", CreateAt: "05/09/2008" },
    { STT: 4, Name: "Lớp 4", Description: "Lớp 4", CreateAt: "10/08/2000" },
    { STT: 5, Name: "Lớp 5", Description: "Lớp 5", CreateAt: "04/12/2003" },
    { STT: 6, Name: "Lớp 6", Description: "Lớp 6", CreateAt: "07/08/2001" },
    { STT: 7, Name: "Lớp 7", Description: "Lớp 7", CreateAt: "14/08/2022" },
    { STT: 8, Name: "Lớp 8", Description: "Lớp 8", CreateAt: "27/12/2021" },
    { STT: 9, Name: "Lớp 9", Description: "Lớp 9", CreateAt: "17/08/2000" },
    { STT: 10, Name: "Lớp 10", Description: "Lớp 10", CreateAt: "27/06/2015" },
    { STT: 11, Name: "Lớp 11", Description: "Lớp 11", CreateAt: "07/11/2014" },
    { STT: 12, Name: "Lớp 12", Description: "Lớp 12", CreateAt: "29/04/2000" },
];

const columns_data = [
    { accessor: "STT", header: "STT" },
    { accessor: "Name", header: "Trình độ" },
    { accessor: "Description", header: "Mô tả" },
    { accessor: "CreateAt", header: "Ngày tạo" },
];

const action_col = (
    <TableCell className="flex justify-between">
        <Button variant="outline">
            <PenBox className="text-blue-500" />
        </Button>
        <Button variant="outline">
            <X className="text-red-500" />
        </Button>
    </TableCell>
);

export default function EducationLevel() {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>Trình độ học vấn</CardTitle>
                    <Button>Thêm</Button>
                </div>
            </CardHeader>
            <CardContent>
                {MyTableFactory(data, columns_data, 0, 4, action_col)}
            </CardContent>
        </Card>
    );
}
