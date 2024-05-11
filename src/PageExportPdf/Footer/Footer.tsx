import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function Footer() {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
                <Checkbox />
                <p>Bỏ qua ảnh</p>
            </div>
            <Button>Tải xuống</Button>
        </div>
    );
}
