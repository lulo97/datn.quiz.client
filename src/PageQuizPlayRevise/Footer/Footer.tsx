import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ActionType, ReviseProps } from "../Utils";
export function Footer(props: ReviseProps) {
    const { state, dispatch } = props;

    function handlePrevious() {
        if (state.QuestionIdx == 0) return;
        dispatch({
            type: ActionType.ChangeQuestionIdx,
            payload: state.QuestionIdx - 1,
        });
    }

    function handleNext() {
        if (state.Quiz?.Questions) {
            if (state.QuestionIdx == state.Quiz.Questions.length - 1) return;
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
            <Button onClick={handleNext} variant="outline" size="icon">
                <ChevronRight />
            </Button>
        </div>
    );
}
