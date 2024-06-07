import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { ActionType, CreateQuestionProps } from "../Utils";
import { Answer as IAnswer } from "@/InterfacesDatabase";

interface AnswerProps extends CreateQuestionProps {
    answer: IAnswer;
}

import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { MCQ, getCheckBoxClass } from "@/Utils";

export function Answer(props: AnswerProps) {
    const { answer, state, dispatch } = props;

    function handleToggleAnswer(id: string) {
        dispatch({ type: ActionType.ToggleAnswer, payload: id });
    }

    function handleChangeAnswer(AnswerId: string, NewContent: string) {

        const is_content_unique = state.Answers.every((ele) => {
            if (NewContent == "") return true;
            if (ele.AnswerId == AnswerId) return true;
            return ele.Content != NewContent;
        });

        if (!is_content_unique) {
            toast.warning("Hai lựa chọn giống nhau", { delay: 100 });
            return;
        }

        dispatch({
            type: ActionType.ChangeAnswer,
            payload: {
                AnswerId: AnswerId,
                Content: NewContent,
            },
        });
    }

    function handleDeleteAnswer(id: string) {
        dispatch({ type: ActionType.DeleteAnswer, payload: id });
    }

    return (
        <div className="flex gap-5 justify-between items-center">
            <Checkbox
                checked={answer.IsCorrect}
                onClick={() => handleToggleAnswer(answer.AnswerId)}
                className={getCheckBoxClass(state.Type?.Name)}
            />

            <Input
                type="text"
                id="option"
                placeholder="Phương án..."
                value={answer.Content}
                onChange={(event) =>
                    handleChangeAnswer(
                        answer.AnswerId,
                        event.currentTarget.value
                    )
                }
            />
            <Button
                onClick={() => handleDeleteAnswer(answer.AnswerId)}
                className={`${
                    state.Answers.length == 2
                        ? "pointer-events-none opacity-30"
                        : ""
                } bg-red-500`}
            >
                <X />
            </Button>
        </div>
    );
}
