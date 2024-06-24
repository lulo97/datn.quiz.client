import { Label } from "@/components/ui/label";
import {  PlayTimeProps } from "../Utils";

export function Header(props: PlayTimeProps) {
    const { state, localPlay, dispatchLS } = props;
    const PassedTime = localPlay.CurrentTime - localPlay.StartTime;
    const TotalTime = localPlay.EndTime - localPlay.StartTime;
    return (
        <div className="flex justify-between items-center">
            <Label>
                Câu số: {localPlay.QuestionIdx + 1}/{state.Questions.length}
            </Label>
            <Label>
                Thời gian: {PassedTime}/{TotalTime}
            </Label>
        </div>
    );
}
