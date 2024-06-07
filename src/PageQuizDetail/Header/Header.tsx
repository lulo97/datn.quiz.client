import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { HeaderLeft } from "./HeaderLeft";
import { HeaderRight } from "./HeaderRight";

export function Header(quiz: QuizDetail) {
    return (
        <div className="flex gap-10">
            <HeaderLeft {...quiz} />
            <HeaderRight {...quiz} />
        </div>
    );
}
