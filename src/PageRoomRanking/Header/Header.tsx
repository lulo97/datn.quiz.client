import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Header() {
    return (
        <div className="flex flex-row justify-between gap-5">
            <div className="w-1/2">
                <Label>Tên phòng</Label>
                <Input defaultValue="Phòng ABC" />
            </div>
            <div className="w-1/2">
                <Label>Tên đề</Label>
                <Input defaultValue="Đề XYZ" />
            </div>
        </div>
    );
}
