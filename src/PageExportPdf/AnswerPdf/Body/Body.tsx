import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { AnswerBubble } from "../AnswerBubble";

function AnswerBubbleRow(props: { QIdx: number }) {
    return (
        <div className="flex items-center gap-1">
            <div className="font-bold text-sm w-4 text-right">{props.QIdx}</div>
            <div className="flex gap-1">
                {[...Array(8).keys()].map((num) => (
                    <AnswerBubble isAlpha={true} num={num} key={num} />
                ))}
            </div>
        </div>
    );
}

export function Body(Quiz: QuizDetail) {
    return (
        <div className="grid grid-cols-3 gap-2 mt-10">
            {[...Array(50).keys()].map((QIdx) => (
                <div key={QIdx}  className="w-full flex items-center justify-center">
                    <AnswerBubbleRow QIdx={QIdx + 1} />
                </div>
            ))}
        </div>
    );
}
