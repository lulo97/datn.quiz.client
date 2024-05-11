import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function Permission() {
    return (
        <Card className="w-1/2">
            <CardHeader>
                <Label>Danh sách quyền</Label>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>Xóa bình luận</li>
                    <li>Xóa đề</li>
                    <li>Sửa đề</li>
                    <li>Gửi thông báo</li>
                </ul>
            </CardContent>
        </Card>
    );
}
