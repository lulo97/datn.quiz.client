import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ActionType, ReviseProps } from "../Utils";
export function Header(props: ReviseProps) {
    const { state, dispatch } = props;
    let ShowExplaination = false;
    let Correct = 0;
    let Incorrect = 0;
    if (state.Response.length > 0 || state.Quiz.Questions.length > 0) {
        const question = state.Response[state.QuestionIdx];
        ShowExplaination = question.ShowExplaination;
        Correct = state.Quiz.Questions[state.QuestionIdx].CorrectUserCount;
        Incorrect = state.Quiz.Questions[state.QuestionIdx].IncorrectUserCount;
    }

    function handleShowExplaination() {
        dispatch({ type: ActionType.ChangeExplain, payload: null });
    }

    return (
        <div className="flex justify-between items-center ">
            <Label>
                Câu số: {state.QuestionIdx + 1}/{state.Quiz?.Questions.length}
            </Label>
            <div className="flex justify-between items-center gap-5">
                {ShowExplaination && (
                    <div className="flex gap-3">
                        <Label>Số người trả lời: {Correct + Incorrect}</Label>
                        <Label>
                            Tỉ lệ chính xác:{" "}
                            <Label className="text-green-500">
                                {" "}
                                {(100 * Correct) / (Correct + Incorrect)} %
                            </Label>
                        </Label>
                    </div>
                )}
                <Button onClick={handleShowExplaination}>Hiện đáp án</Button>
            </div>
        </div>
    );
}
