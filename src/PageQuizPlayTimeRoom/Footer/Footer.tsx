import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ModalSubmit } from "./ModalSubmit";
import { QuizPlayTimeRoomProps } from "../Utils";

export function Footer(props: QuizPlayTimeRoomProps) {
    const { state, setState, quiz } = props;

    const IsFirst = state.QuestionIdx == 0;
    const IsLast = state.QuestionIdx == quiz.Questions.length - 1;

    function handlePrevious() {
        if (IsFirst) return;
        setState({
            ...state,
            QuestionIdx: state.QuestionIdx - 1,
        });
    }

    function handleNext() {
        if (IsLast) return;
        setState({
            ...state,
            QuestionIdx: state.QuestionIdx + 1,
        });
    }

    return (
        <div className="flex justify-between w-full">
            <Button onClick={handlePrevious} variant="outline" size="icon">
                <ChevronLeft />
            </Button>
            <ModalSubmit {...props} />
            <Button onClick={handleNext} variant="outline" size="icon">
                <ChevronRight />
            </Button>
        </div>
    );
}
