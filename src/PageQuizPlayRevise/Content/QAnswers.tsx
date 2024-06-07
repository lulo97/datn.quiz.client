import { getCheckBoxClass } from "@/Utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionType, ReviseProps } from "../Utils";

export function QAnswers({ state, dispatch }: ReviseProps) {
    const question = state.Quiz?.Questions[state.QuestionIdx];
    const Response = state.Response[state.QuestionIdx];

    const handleCheckboxClick = (AnswerId: string) => {
        dispatch({
            type: ActionType.ChangeSelectedAnswer,
            payload: AnswerId,
        });
    };

    return (
        <div className="max-h-64 overflow-y-auto border rounded-sm p-1 mt-2 flex flex-col gap-3">
            {question?.Answers.map((answer) => {
                const isChecked = Response.SelectedAnswers.includes(
                    answer.AnswerId
                );

                let CorrectClass = "bg-red-200";
                if (answer.IsCorrect == true) {
                    CorrectClass = "bg-green-200";
                }

                return (
                    <div
                        key={answer.AnswerId}
                        className={`${CorrectClass} pl-2 rounded-lg flex gap-5 justify-start items-center`}
                    >
                        <Checkbox
                            onClick={() => handleCheckboxClick(answer.AnswerId)}
                            checked={isChecked}
                            className={getCheckBoxClass(question.Type?.Name)}
                        />
                        <div>{answer.Content}</div>
                    </div>
                );
            })}
        </div>
    );
}
