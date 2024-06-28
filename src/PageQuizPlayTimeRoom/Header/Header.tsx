import { Label } from "@/components/ui/label";
import { QuizPlayTimeRoomProps } from "../Utils";
import { useEffect, useState } from "react";

export function Header(props: QuizPlayTimeRoomProps) {
    const { state, setState, quiz } = props;
    const PassedTime = Math.trunc((Date.now() - state.StartTimePlay)/1000);
    const TotalTime = quiz.Time? quiz.Time.Value*60 : 0;

    return (
        <div className="flex justify-between items-center">
            <Label>
                Câu số: {state.QuestionIdx + 1}/{quiz.Questions.length}
            </Label>
            <Label>
                Thời gian: {PassedTime}/{TotalTime}
            </Label>
        </div>
    );
}
