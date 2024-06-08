import { Label } from "@/components/ui/label";
import {  PlayTimeProps } from "../Utils";

export function Header(props: PlayTimeProps) {
    const { state, dispatch } = props;
    const PassedTime = state.CurrentTime - state.StartTime;
    const TotalTime = state.EndTime - state.StartTime;
    return (
        <div className="flex justify-between items-center">
            <Label>
                Câu số: {state.QuestionIdx + 1}/{state.Quiz.Questions.length}
            </Label>
            <Label>
                Thời gian: {PassedTime}/{TotalTime}
            </Label>
        </div>
    );
}
