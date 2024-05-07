import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { PenBox, X } from "lucide-react";
import MyTableFactory from "@/components/table/MyTableFactory";

const data = [
    {
        STT: 1,
        Name: "Nhận biết",
        Description: "Nhận biết, nhắc lại được kiến thức, kĩ năng đã học.",
        CreateAt: "07/05/2024",
    },
    {
        STT: 2,
        Name: "Thông hiểu",
        Description:
            "Hiểu kiến thức, kĩ năng đã học. trình bày, giải thích được kiến thức theo cách hiểu của cá nhân.",
        CreateAt: "02/03/2023",
    },
    {
        STT: 3,
        Name: "Vận dụng",
        Description:
            "Biết vận dụng kiến thức, kĩ năng đã học để giải quyết những vấn dề quen thuộc, tương tự trong học tập, cuộc sống.",
        CreateAt: "05/09/2008",
    },
    {
        STT: 4,
        Name: "Vận dụng cao",
        Description:
            "Vận dụng các kiến thức, kĩ năng đã học để giải quyết vấn đề mới hoặc đưa ra những phản hồi hợp lý trong học tập, cuộc sống một cách linh hoạt.",
        CreateAt: "05/09/2008",
    },
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

export default function Difficult() {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>Độ khó của câu hỏi</CardTitle>
                    <Button>Thêm</Button>
                </div>
            </CardHeader>
            <CardContent>
                {MyTableFactory(data, columns_data, 0, 4, action_col)}
            </CardContent>
        </Card>
    );
}
