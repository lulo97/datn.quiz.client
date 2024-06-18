import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { HeaderLeft } from "./HeaderLeft";
import { HeaderBottom } from "./HeaderBottom";
import { HeaderRight } from "./HeaderRight";

export function Header(Quiz: QuizDetail) {
    return (
        <div>
            <div className="flex justify-evenly mb-5">
                <HeaderLeft {...Quiz} />
                <HeaderRight {...Quiz} />
            </div>
            <HeaderBottom {...Quiz} />
        </div>
    );
}
