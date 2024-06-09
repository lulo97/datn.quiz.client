import { QuestionAI } from "../Utils";
import { getAnswerStyle } from "@/Utils";
import { Label } from "@/components/ui/label";
import { PenBox } from "lucide-react";

interface Props {
    question: QuestionAI;
    question_idx: number;
}

export function RightQuestion(props: Props) {
    const { question, question_idx } = props;
    return (
        <div className="bg-white mb-1 text-sm flex flex-row justify-between border rounded-lg p-2 w-full">
            <div className="w-full">
                <div className="w-full">
                    <Label className="mr-1">Câu {question_idx + 1}:</Label>
                    {question.Question}
                </div>
                <div className="flex flex-col">
                    {question.Answers.map((ele, idx) => {
                        return (
                            <li
                                key={idx}
                                className={getAnswerStyle(ele.IsCorrect)}
                            >
                                {ele.Answer}
                            </li>
                        );
                    })}
                </div>
                <div className="w-full">Giải thích: {question.Explanation}</div>
                <div className="flex justify-end w-full">
                    <PenBox className="text-blue-500 hover:text-blue-600 hover:cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
