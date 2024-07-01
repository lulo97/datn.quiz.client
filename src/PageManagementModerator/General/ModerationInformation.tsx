import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function ModerationInformation() {
    return (
        <Card>
            <CardHeader>
                <Label>Thông tin kiểm duyệt</Label>
            </CardHeader>
            <CardContent>
                <div>
                    <div>
                        <Label>Đề kiểm duyệt: </Label>123
                    </div>
                    <div>
                        <Label>Xử lý báo cáo: </Label>987
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
