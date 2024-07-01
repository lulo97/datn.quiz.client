import { Label } from "@/components/ui/label";
import { Admin } from "./Utils";

export function Information(data: Admin) {
    return (
        <div className="flex justify-between gap-5">
            <Label className="w-full border shadow p-4 rounded-xl">
                Số người dùng: {data.TotalUser}
            </Label>
            <Label className="w-full border shadow p-4 rounded-xl">
                Số đề: {data.TotalQuiz}
            </Label>
            <Label className="w-full border shadow p-4 rounded-xl">
                Số câu hỏi: {data.TotalQuestion}
            </Label>
        </div>
    );
}
