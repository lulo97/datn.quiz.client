import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function HeaderRightInformation() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>
                        <Label>Lượt chơi: </Label>1000
                    </li>
                    <li>
                        <Label>Người tạo: </Label>luongpysl
                    </li>
                    <li>
                        <Label>Ngày tạo: </Label>24/4/2024
                    </li>
                    <li>
                        <Label>Số câu: </Label>12
                    </li>
                    <li>
                        <Label>Loại đề: </Label>Nhiều đáp án
                    </li>
                    <li>
                        <Label>Trình độ: </Label>Lớp 12
                    </li>
                    <li>
                        <Label>Chủ đề: </Label>Toán / Hàm số
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
}