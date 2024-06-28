import { BACKEND_URL, VITE_SERVER_PATH } from "@/Utils";
import { useState, useEffect } from "react";
import { ReviseProps } from "../Utils";
export function QMedia(props: ReviseProps) {
    const { state } = props;
    const question = state.Quiz?.Questions[state.QuestionIdx];
    const API_URL = BACKEND_URL + "public/Image/DummyImage.png";
    const [imageSrc, setImageSrc] = useState<string>(API_URL);

    useEffect(() => {
        if (question?.ImageUrl) {
            setImageSrc(VITE_SERVER_PATH + question.ImageUrl);
        } else {
            setImageSrc(API_URL);
        }
    }, [question?.ImageUrl]);
    return (
        <div className="flex flex-col gap-3">
            <img
                className="object-contain rounded-xl max-h-[300px] w-[800px]"
                src={imageSrc}
            ></img>
            <audio className="w-full" controls>
                <source src={question?.AudioUrl || ""} type="audio/ogg" />
            </audio>
        </div>
    );
}
