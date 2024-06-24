import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlayTimeProps } from "../Utils";
import { ModalSubmit } from "./ModalSubmit";
import { ActionTypeLS } from "../ReducerLocalStorage";

export function Footer(props: PlayTimeProps) {
    const { state, localPlay, dispatchLS } = props;

    const IsFirst = localPlay.QuestionIdx == 0;
    const IsLast = localPlay.QuestionIdx == state.Questions.length - 1;

    function handlePrevious() {
        if (IsFirst) return;
        dispatchLS(state, {
            type: ActionTypeLS.ChangeQuestionIdx,
            payload: localPlay.QuestionIdx - 1,
        });
    }

    function handleNext() {
        if (state.Questions) {
            if (IsLast) return;
        }
        dispatchLS(state, {
            type: ActionTypeLS.ChangeQuestionIdx,
            payload: localPlay.QuestionIdx + 1,
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
