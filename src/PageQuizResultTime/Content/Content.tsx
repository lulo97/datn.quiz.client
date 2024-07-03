import { Card, CardHeader } from "@/components/ui/card";
import { PlayDetail } from "../Utils";
import { QuestionCards } from "@/components/question_card/QuestionCard";

export function Content(data: PlayDetail) {
    return (
        <div>
            <Card className="bg-gray-200">
                <CardHeader>
                    <QuestionCards {...data} />
                </CardHeader>
            </Card>
        </div>
    );
}