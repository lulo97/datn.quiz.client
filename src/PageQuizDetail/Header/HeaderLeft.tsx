import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { BACKEND_URL, VITE_SERVER_PATH } from "@/Utils";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export function HeaderLeft(quiz: QuizDetail) {

    const API_URL = BACKEND_URL + "public/Image/DummyImage.png";
    const [imageSrc, setImageSrc] = useState<string>(API_URL);
    useEffect(() => {
        if (quiz.ImageUrl) {
            setImageSrc(VITE_SERVER_PATH + quiz.ImageUrl)
        }
    }, [quiz.ImageUrl]);

    return (
        <div className="w-2/3 flex flex-col gap-3">
            <Label>{quiz.Name}</Label>
            <p>{quiz.Description || "Không có mô tả"}</p>

            <img
                className="object-contain rounded-2xl"
                src={imageSrc}
            ></img>
        </div>
    );
}
