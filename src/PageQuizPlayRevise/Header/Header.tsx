import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ActionType, ReviseProps } from "../Utils";
export function Header(props: ReviseProps) {
    const { state, dispatch } = props;
    function handleShowExplaination() {
        dispatch({type:ActionType.ChangeExplain, payload: null})
    }
    return (
        <div className="flex justify-between items-center">
            <Label>
                Câu số: {state.QuestionIdx + 1}/{state.Quiz?.Questions.length}
            </Label>
            <Button onClick={handleShowExplaination}>Hiện đáp án</Button>
        </div>
    );
}
