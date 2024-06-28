import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { BACKEND_URL, VITE_SERVER_PATH } from "@/Utils";
import { useEffect, useState } from "react";

export function QCRightImg(question: QuestionDetail) {
    const API_URL = BACKEND_URL + "public/Image/DummyImage.png";
    const [imageSrc, setImageSrc] = useState<string>(API_URL);

    useEffect(() => {
        if (question.ImageUrl) {
            setImageSrc(VITE_SERVER_PATH + question.ImageUrl);
        }
    }, [question.ImageUrl]);

    if (!question.ImageUrl) return;

    return (
        <img
            className="object-contain w-full rounded-lg max-h-[200px]"
            src={imageSrc}
        ></img>
    );
}
