import { PlayTimeProps } from "../Utils";
import { getCheckBoxClass } from "@/Utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionTypeLS } from "../ReducerLocalStorage";

export function QAnswers(props: PlayTimeProps) {
    const { state, localPlay, dispatchLS } = props;
    const QuestionIdx = localPlay.QuestionIdx;
    const Response = localPlay.Response[QuestionIdx];
    const Question = state.Questions[QuestionIdx];

    const handleCheckboxClick = (AnswerId: string) => {
        dispatchLS(state, {
            type: ActionTypeLS.ChangeSelectedAnswer,
            payload: AnswerId,
        });
    };

    return (
        <div className="max-h-64 overflow-y-auto border rounded-sm p-1 mt-2 flex flex-col gap-3">
            {Question.Answers.map((ans, idx) => {
                const isChecked = Response.SelectedAnswers.includes(
                    ans.AnswerId
                );

                return (
                    <div
                        key={ans.AnswerId}
                        className={`pl-2 rounded-lg flex gap-5 justify-start items-center`}
                    >
                        <Checkbox
                            onClick={() => handleCheckboxClick(ans.AnswerId)}
                            checked={isChecked}
                            className={getCheckBoxClass(Question.Type?.Name)}
                        />
                        <div>{ans.Content}</div>
                    </div>
                );
            })}
        </div>
    );
}
