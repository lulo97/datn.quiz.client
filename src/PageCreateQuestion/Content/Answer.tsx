import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { ActionType, CreateQuestionProps, ICQ_Answer } from "../Utils";

interface AnswerProps extends CreateQuestionProps {
    answer: ICQ_Answer
}

export function Answer(props: AnswerProps) {
    const { answer, state, dispatch } = props;

    function handleToggleAnswer(id: string) {
        dispatch({type: ActionType.ToggleAnswer, payload: id})
    }

    function handleChangeAnswer(id: string, new_content: string) {
        dispatch({type: ActionType.ChangeAnswer, payload: {
            Id: id,
            Content: new_content
        }})
    }

    function handleDeleteAnswer(id: string) {
        dispatch({type: ActionType.DeleteAnswer, payload: id})
    }

    return (
        <div className="flex gap-5 justify-between items-center">
            <Switch
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200"
                onClick={() => handleToggleAnswer(answer.Id)}
            />
            <Input
                type="text"
                id="option"
                placeholder={answer.Content}
                value={answer.Content}
                onChange={(event) =>
                    handleChangeAnswer(answer.Id, event.target.value)
                }
            />
            <Button
                onClick={() => handleDeleteAnswer(answer.Id)}
                className="bg-red-500"
            >
                <X />
            </Button>
        </div>
    );
}
