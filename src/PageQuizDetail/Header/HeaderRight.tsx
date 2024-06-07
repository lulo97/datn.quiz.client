import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { HeaderRightInformation } from "./HeaderRightInformation";
import { HeaderRightRating } from "./HeaderRightRating";

export function HeaderRight(quiz: QuizDetail) {
    return (
        <div className="w-1/3 flex flex-col gap-3">
            <HeaderRightInformation {...quiz} />
            <HeaderRightRating {...quiz} />
        </div>
    );
}
