import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { HeaderLeft } from "./HeaderLeft";
import { HeaderBottom } from "./HeaderBottom";
import { HeaderRight } from "./HeaderRight";

export function Header(Quiz: QuizDetail) {
    return (
        <div>
            <div className="flex justify-between px-4 mb-5">
                <HeaderLeft />
                <HeaderRight {...Quiz} />
            </div>
            <HeaderBottom {...Quiz} />
        </div>
    );
}
