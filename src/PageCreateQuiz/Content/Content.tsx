import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { QuestionCard } from "./QuestionCard";

export function Content() {
    return (
        <div>
            <Label>Danh sách câu hỏi</Label>
            <Card className="p-1 bg-gray-100">
                <div className="flex flex-col gap-10 py-5">
                    <QuestionCard />
                    <QuestionCard />
                    <QuestionCard />
                </div>
            </Card>
        </div>
    );
}
