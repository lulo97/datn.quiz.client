import { PlayTimeProps } from "../Utils";
import { VITE_SERVER_PATH } from "@/Utils";
import { useState, useEffect } from "react";

export function QMedia(props: PlayTimeProps) {
    const { state, localPlay } = props;
    const QuestionIdx = localPlay.QuestionIdx;
    const Question = state.Questions[QuestionIdx];

    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        if (Question.ImageUrl) {
            setImageSrc(VITE_SERVER_PATH + Question.ImageUrl);
        } else {
            setImageSrc("");
        }
    }, [Question.ImageUrl]);

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
