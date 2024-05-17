import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function Header() {
    return (
        <div>
            <div>
                <Label>Tên phòng</Label>
                <Input className="shadow" defaultValue="Đề toán 12 chương hàm số" />
            </div>

            <div className="mt-2 flex justify-between gap-5">
                <Label className="w-full border shadow p-4 rounded-xl">
                    Số người tham gia: 9/12
                </Label>
                <Label className="w-full border shadow p-4 rounded-xl">
                    Đếm ngược kết thúc: 4p32s
                </Label>
            </div>
        </div>
    );
}
