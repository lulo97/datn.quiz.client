import { MCQ, SCQ, getCheckBoxClass } from "@/Utils";
import { Checkbox } from "@/components/ui/checkbox";
import { QuizPlayTimeRoomProps } from "../Utils";

export function QAnswers(props: QuizPlayTimeRoomProps) {
    const { state, setState, quiz } = props;
    const QuestionIdx = state.QuestionIdx;
    const Response = state.Response[QuestionIdx];
    const CurrentQuestion = quiz.Questions[QuestionIdx];

    const handleCheckboxClick = (AnswerId: string) => {
        const SelectedAnswers = state.Response[QuestionIdx].SelectedAnswers;
        let _SelectedAnswers: string[] = [...SelectedAnswers, AnswerId];
        const isSCQ = CurrentQuestion.Type?.Name === SCQ;
        const isMCQ = CurrentQuestion.Type?.Name === MCQ;

        if (isSCQ && SelectedAnswers.length > 0) {
            _SelectedAnswers = [AnswerId];
        }
        if (isMCQ && SelectedAnswers.includes(AnswerId)) {
            _SelectedAnswers = _SelectedAnswers.filter((id) => id !== AnswerId);
        }
        const Response = state.Response.map((response) => {
            if (response.QuestionId === CurrentQuestion.QuestionId) {
                return {
                    ...response,
                    SelectedAnswers: _SelectedAnswers,
                };
            }
            return response;
        });
        setState({...state, Response: Response})
    };

    return (
        <div className="max-h-64 overflow-y-auto border rounded-sm p-1 mt-2 flex flex-col gap-3">
            {CurrentQuestion.Answers.map((ans) => {
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
                            className={getCheckBoxClass(
                                CurrentQuestion.Type?.Name
                            )}
                        />
                        <div>{ans.Content}</div>
                    </div>
                );
            })}
        </div>
    );
}
