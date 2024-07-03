import { Menu, X } from "lucide-react";
import { CreateQuizProps } from "../Utils";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { ActionType } from "../Action";
import { UpdateModal } from "./UpdateModal";

interface QCHeaderProps extends CreateQuizProps {
    question: QuestionDetail;
    idx: number;
}

export function QCHeader(props: QCHeaderProps) {
    const { dispatch, question, idx } = props;
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
                <Menu className="cursor-pointer" />
                <UpdateModal
                    record={question}
                />
                <X
                    onClick={handleDeleteQuestion}
                    className="text-red-500 hover:cursor-pointer"
                />
            </div>
        </div>
    );
}
