import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ActionType, ReviseProps } from "../Utils";

function getAccuracy(Correct: number, Incorrect: number) {
    if (Correct + Incorrect == 0) return 0;
    const output = (100 * Correct) / (Correct + Incorrect);
    return Math.round(output * 100) / 100;
}

export function Header(props: ReviseProps) {
    const { state, dispatch } = props;
    if (!state.Quiz) return;
    let ShowExplanation = false;
    let Correct = 0;
    let Incorrect = 0;
    if (state.Response.length > 0 || state.Quiz.Questions.length > 0) {
        const question = state.Response[state.QuestionIdx];
        ShowExplanation = question.ShowExplanation;
        Correct = state.Quiz.Questions[state.QuestionIdx].CorrectUserCount;
        Incorrect = state.Quiz.Questions[state.QuestionIdx].IncorrectUserCount;
    }

    function handleShowExplanation() {
        dispatch({ type: ActionType.ChangeExplain, payload: null });
    }

    return (
        <div className="flex justify-between items-center ">
            <Label>
                Câu số: {state.QuestionIdx + 1}/{state.Quiz?.Questions.length}
            </Label>
            <div className="flex justify-between items-center gap-5">
                {ShowExplanation && (
                    <div className="flex gap-3">
                        <Label>Số người trả lời: {Correct + Incorrect}</Label>
                        <Label>
                            Tỉ lệ chính xác:{" "}
                            <Label className="text-green-500">
                                {" "}
                                {getAccuracy(Correct, Incorrect)} %
                            </Label>
                        </Label>
                    </div>
                )}
                <Button onClick={handleShowExplanation}>Hiện đáp án</Button>
            </div>
        </div>
    );
}
