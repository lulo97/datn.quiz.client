import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";
import { ActionType, CreateQuestionProps } from "../Utils";
import { Answer as IAnswer } from "@/InterfacesDatabase";

interface AnswerProps extends CreateQuestionProps {
    answer: IAnswer;
}

import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@/components/ui/checkbox";
import { getCheckBoxClass } from "@/Utils";

export function Answer(props: AnswerProps) {
    const { answer, state, dispatch } = props;

    function handleToggleAnswer(id: string) {
        dispatch({ type: ActionType.ToggleAnswer, payload: id });
    }

    function handleChangeAnswer(AnswerId: string, NewContent: string) {
        dispatch({
            type: ActionType.ChangeAnswer,
            payload: {
                AnswerId: AnswerId,
                Content: NewContent,
            },
        });
    }

    function handleDeleteAnswer(AnswerId: string) {
        dispatch({ type: ActionType.DeleteAnswer, payload: AnswerId });
    }

    return (
        <div className="flex gap-5 justify-between items-center">
            <Menu
                
            />
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
