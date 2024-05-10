import { QuizSubjectCard } from "@/PageQuizSubject/QuizSubjectCard";
import { Label } from "@/components/ui/label";

export function Footer() {
    return (
        <div className="border p-4">
            <div>
                <Label className="text-xl">Đề đã chọn</Label>
            </div>

            <QuizSubjectCard />
        </div>
    );
}
