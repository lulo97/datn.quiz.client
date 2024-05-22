import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { ActionType, CreateQuestionProps } from "../Utils";
import { Answer as IAnswer } from "@/InterfacesDatabase";

interface AnswerProps extends CreateQuestionProps {
    answer: IAnswer;
}
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@/components/ui/checkbox";

export function Answer(props: AnswerProps) {
    const { answer, state, dispatch } = props;

    function handleToggleAnswer(id: string) {
        const correctAnswersCount = state.Answers.filter(
            (ele) => ele.IsCorrect
        ).length;

        if (
            correctAnswersCount === 1 &&
            state.Answers.find((ele) => ele.AnswerId === id)?.IsCorrect
        ) {
            // If there is only one correct answer and it is the one being toggled, do not allow the toggle
            toast.warning("Cần ít nhất một lựa chọn đúng", {delay: 100});
            return;
        }
        dispatch({ type: ActionType.ToggleAnswer, payload: id });
    }

    function handleChangeAnswer(AnswerId: string, NewContent: string) {
        const isContentUnique = state.Answers.every((ele) => {
            if (ele.Content == "" && NewContent == "") return true;
            return ele.AnswerId === AnswerId || ele.Content !== NewContent;
        });

        if (!isContentUnique) {
            toast.warning("Hai lựa chọn giống nhau", {delay: 100});
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
            {state.Type?.Name == "Nhiều đáp án" && (
                <Checkbox
                    checked={answer.IsCorrect}
                    onClick={() => handleToggleAnswer(answer.AnswerId)}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
            )}
            {state.Type?.Name == "Một đáp án" && (
                <Checkbox
                    checked={answer.IsCorrect}
                    onClick={() => handleToggleAnswer(answer.AnswerId)}
                    className="rounded-full data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
            )}

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
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
