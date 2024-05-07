import { Label } from "@/components/ui/label";

export default function Information() {
    return (
        <div className="flex justify-between gap-5">
            <Label className="w-full border shadow p-4 rounded-xl">
                Số người dùng: 1234
            </Label>
            <Label className="w-full border shadow p-4 rounded-xl">
                Số đề: 100
            </Label>
            <Label className="w-full border shadow p-4 rounded-xl">
                Số câu hỏi: 200
            </Label>
        </div>
    );
}