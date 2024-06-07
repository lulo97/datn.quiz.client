import { PenBox, X } from "lucide-react";
import { ActionType, CreateQuizProps } from "../Utils";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";

interface QCHeaderProps extends CreateQuizProps {
    question: QuestionDetail;
    idx: number;
}

export function QCHeader(props: QCHeaderProps) {
    const { state, dispatch, question, idx } = props;
    function handleDeleteQuestion() {
        dispatch({
            type: ActionType.DeleteQuestion,
            payload: question.QuestionId,
        });
    }
    return (
        <div className="flex justify-between">
            <div className="font-semibold">Câu {idx}:</div>
            <div className="flex gap-2">
                <PenBox className="text-green-500 hover:cursor-pointer" />
                <X
                    onClick={handleDeleteQuestion}
                    className="text-red-500 hover:cursor-pointer"
                />
            </div>
        </div>
    );
}
