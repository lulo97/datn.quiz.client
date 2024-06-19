import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { wrapImageByPoints } from "../Utils/wrapImageByPoints";
import {
    PropsMPP,
    calculateScaledPoints,
    getUserResponseDetail,
} from "../Utils/Utils";
import { getAnswerSheetResponse } from "../Utils/getAnswerSheetResponse";
import { useEffect } from "react";
import _ from "lodash";
import QrScanner from "qr-scanner";
import { getAllByQuizId as getAllQuestionDetailByQuizId } from "@/api/QuestionDetail";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";

export function Header(props: PropsMPP) {
    const {
        setFile,
        parentRef,
        positions,
        setCroppedImg,
        imageRefFromFile,
        setUserResponseDetail,
        userResponseDetail,
        croppedImg,
        setQuizId,
        QuizId,
    } = props;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
            const reader = new FileReader();
            reader.onload = function (e) {
                imageRefFromFile.current.src = reader.result as string;
            };
            reader.readAsDataURL(files[0]);
        }
    }

    function handleProcessImage() {
        if (!parentRef.current) return;
        const scaled_points = calculateScaledPoints(
            positions,
            imageRefFromFile.current,
            parentRef.current
        );
        wrapImageByPoints(
            imageRefFromFile.current,
            scaled_points.map((ele) => [ele.x, ele.y])
        ).then((dataUrl) => {
            setCroppedImg(dataUrl);
        });
    }

    useEffect(() => {
        if (croppedImg && QuizId) {
            getAnswerSheetResponse(croppedImg).then((userResponse) => {
                async function fetchData() {
                    const Questions: QuestionDetail[] =
                        await getAllQuestionDetailByQuizId(QuizId);
                    const userResponseDetail = getUserResponseDetail(
                        Questions,
                        userResponse
                    );
                    setUserResponseDetail(userResponseDetail);
                }

                fetchData();
            });
        }
    }, [croppedImg, QuizId]);

    useEffect(() => {
        if (croppedImg) {
            QrScanner.scanImage(croppedImg, {
                returnDetailedScanResult: true,
            }).then((result) => {
                setQuizId(result.data);
            });
        }
    }, [croppedImg]);

    return (
        <div className="flex justify-between h-fit">
            <div className="flex gap-5">
                <Button>Chụp</Button>
                <Input
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleChange(e)}
                />
                <Button onClick={handleProcessImage}>Xử lý ảnh</Button>
            </div>
        </div>
    );
}
