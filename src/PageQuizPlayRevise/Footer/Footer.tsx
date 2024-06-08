import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ActionType, ReviseProps } from "../Utils";
import { useNavigate } from "react-router-dom";
export function Footer(props: ReviseProps) {
    const navigate = useNavigate();
    const { state, dispatch } = props;
    const IsFirst = state.QuestionIdx == 0;
    const IsLast = state.QuestionIdx == state.Quiz.Questions.length - 1;

    function handlePrevious() {
        if (IsFirst) return;
        dispatch({
            type: ActionType.ChangeQuestionIdx,
            payload: state.QuestionIdx - 1,
        });
    }

    function handleNext() {
        if (state.Quiz?.Questions) {
            if (IsLast) return;
        }
        dispatch({
            type: ActionType.ChangeQuestionIdx,
            payload: state.QuestionIdx + 1,
        });
    }

    return (
        <div className="flex justify-between w-full">
            <Button onClick={handlePrevious} variant="outline" size="icon">
                <ChevronLeft />
            </Button>
            {IsLast && (
                <Button onClick={() => navigate(`/QuizResultRevise/${state.Quiz.QuizId}`)}>
                    Nộp bài
                </Button>
            )}
            {!IsLast && (
                <Button onClick={handleNext} variant="outline" size="icon">
                    <ChevronRight />
                </Button>
            )}
        </div>
    );
}
