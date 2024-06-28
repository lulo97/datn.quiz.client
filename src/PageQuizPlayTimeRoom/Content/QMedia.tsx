import { VITE_SERVER_PATH } from "@/Utils";
import { useState, useEffect } from "react";
import { QuizPlayTimeRoomProps } from "../Utils";

export function QMedia(props: QuizPlayTimeRoomProps) {
    const { state, quiz } = props;
    const QuestionIdx = state.QuestionIdx;
    const Question = quiz.Questions[QuestionIdx];
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        if (Question.ImageUrl) {
            setImageSrc(VITE_SERVER_PATH + Question.ImageUrl);
        } else {
            setImageSrc("")
        }
    }, [Question.ImageUrl, QuestionIdx]);

    return (
        <div className="flex flex-col gap-3">
            {imageSrc && (
                <img
                    className="object-contain rounded-xl max-h-[300px] w-[800px]"
                    src={imageSrc}
                ></img>
            )}
            {Question.AudioUrl && (
                <audio className="w-full" controls>
                    <source src={Question.AudioUrl || ""} type="audio/ogg" />
                </audio>
            )}
        </div>
    );
}
