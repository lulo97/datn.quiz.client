import { Label } from "@/components/ui/label";
import { Pdf } from "./Pdf";

export function Content() {
    return (
        <div className="border p-4">
            <div>
                <Label className="text-xl">Đề đã chọn</Label>
            </div>
            <Pdf />
        </div>
    );
}
