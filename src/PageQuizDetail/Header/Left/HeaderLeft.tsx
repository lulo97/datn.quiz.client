import { BACKEND_URL, VITE_SERVER_PATH, toDDMMYYY } from "@/Utils";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { QuizDetailProps } from "../../QuizDetail";

const API_URL = BACKEND_URL + "public/Image/DummyImage.png";

export function HeaderLeft(props: QuizDetailProps) {
    const { quiz } = props;
    const [imageSrc, setImageSrc] = useState<string>(API_URL);

    useEffect(() => {
        if (quiz.ImageUrl) {
            setImageSrc(VITE_SERVER_PATH + quiz.ImageUrl);
        }
    }, [quiz.ImageUrl]);

    return (
        <div className="w-2/3 flex flex-col gap-3">
            <div className="flex items-start">
                <div className="w-full">
                    <Label>Đề thi: {quiz.Name}</Label>
                    <p>Mô tả: {quiz.Description || "Không có mô tả"}</p>
                </div>
                <div className="w-1/4 text-xs text-gray-500 text-end">
                    {quiz.UserVertify && (
                        <div>
                            <div>Đã kiểm duyệt</div>
                            <div>
                                {quiz.VerifiedAt && toDDMMYYY(quiz.VerifiedAt)}
                            </div>
                        </div>
                    )}
                    {!quiz.UserVertify && <div>Chưa kiểm duyệt</div>}
                </div>
            </div>
            <img className="object-contain rounded-2xl" src={imageSrc}></img>
        </div>
    );
}
