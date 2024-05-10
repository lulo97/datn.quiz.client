import { Card } from "@/components/ui/card";
import { QuestionCardContent } from "./QuestionCardContent";
import { QuestionCardOptions } from "./QuestionCardOptions";
import { QuestionCardExplanation } from "./QuestionCardExplanation";
import { QuestionCardImage } from "./QuestionCardImage";
import { QuestionCardButtons } from "./QuestionCardButtons";

export function QuestionCard() {
    return (
        <div>
            <Card className="px-6 py-4">
                <div className="flex justify-between">
                    <div className="w-[50%]">
                        <QuestionCardContent />
                        <div className="mt-1">
                            <QuestionCardOptions />
                            <QuestionCardExplanation />
                        </div>
                    </div>
                    <div className="w-[40%] flex flex-col justify-between items-center">
                        <QuestionCardImage />
                        <QuestionCardButtons />
                    </div>
                </div>
            </Card>
        </div>
    );
}
