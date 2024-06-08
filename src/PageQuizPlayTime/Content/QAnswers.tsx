import { ActionType, LocalPlaying, PlayTime, PlayTimeProps } from "../Utils";
import { getCheckBoxClass } from "@/Utils";
import { Checkbox } from "@/components/ui/checkbox";

export function QAnswers(props: PlayTimeProps) {
    const { state, dispatch } = props;
    let localPlaying: PlayTime = state;

    const storedData = localStorage.getItem(LocalPlaying);
    if (storedData != null) {
        localPlaying = JSON.parse(storedData);
    }

    const QuestionIdx = localPlaying.QuestionIdx;
    const Response = localPlaying.Response[QuestionIdx];
    const Question = localPlaying.Quiz.Questions[QuestionIdx];

    const handleCheckboxClick = (AnswerId: string) => {
        dispatch({
            type: ActionType.ChangeSelectedAnswer,
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
