import { Star } from "lucide-react";
import { ModalViewRating } from "../../ModalViewRating/ModalViewRating";
import { getAllByQuiz } from "@/PageQuizDetail/API/Rating";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Rating, User } from "@/InterfacesDatabase";
import { QuizDetailProps } from "@/PageQuizDetail/QuizDetail";

export interface RatingDetail extends Omit<Rating, "UserId"> {
    User: User;
}

export function Rate(props: QuizDetailProps) {
    const { quiz } = props;
    const [rates, setRates] = useState<RatingDetail[]>();

    useEffect(() => {
        async function fetchData() {
            const result = await getAllByQuiz(quiz.QuizId);
            if (!result || "error" in result) {
                toast.error("Có lỗi!");
                console.log(result);
            } else {
                setRates(result);
            }
        }
        fetchData();
    }, [open]);

    if (!rates) return <div>Đang tải!</div>;

    const averageScore =
        rates.length > 0
            ? rates.reduce((sum, rate) => sum + rate.Score, 0) / rates.length
            : 0;

    return (
        <div className="flex gap-5 justify-between items-center">
            <ModalViewRating rates={rates} />
            <div className="flex items-center gap-1">
                <Stars score={averageScore} />
            </div>
        </div>
    );
}

function Stars({ score }: { score: number }) {
    const filledStars = Array.from(Array(Math.floor(score)).keys());
    const emptyStars = Array.from(Array(5 - Math.floor(score)).keys());

    return (
        <div className="flex items-center">
            <div className="text-gray-500 text-sm mr-1">
                {Math.round(score * 100) / 100}
            </div>
            {filledStars.map((_, index) => (
                <Star key={`filled-${index}`} fill="yellow" />
            ))}
            {emptyStars.map((_, index) => (
                <Star key={`empty-${index}`} fill="none" />
            ))}
        </div>
    );
}
