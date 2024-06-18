import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { AnswerBubble } from "../AnswerBubble";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

function STTRow() {
    return (
        <div className="flex gap-1">
            {[...Array(10).keys()].map((num) => (
                <AnswerBubble isAlpha={false} num={num} key={num} />
            ))}
        </div>
    );
}

function STTRows() {
    return (
        <div className="flex flex-col gap-1">
            <STTRow />
            <STTRow />
            <STTRow />
        </div>
    );
}

export function HeaderBottom(Quiz: QuizDetail) {
    const [qrCodeImage, setQRCodeImage] = useState<string | null>(null);
    const generateQRCode = async () => {
        try {
            const url = await QRCode.toDataURL(Quiz.QuizId);
            console.log(url);
            setQRCodeImage(url);
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };

    useEffect(() => {
        generateQRCode();
    }, []);

    return (
        <div className="flex justify-evenly">
            <div className="flex gap-3 items-center">
                <div className="text-sm">Mã đề:</div>
                {qrCodeImage && <img className="w-24" src={qrCodeImage} alt="QR Code" />}
            </div>
            <div className="flex flex-col justify-evenly items-center">
                <div className="text-sm">Số thứ tự</div>
                <STTRows />
            </div>
        </div>
    );
}
