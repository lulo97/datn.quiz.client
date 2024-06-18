import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { HeaderBottom } from "./HeaderBottom";
import { HeaderLeft } from "./HeaderLeft";
import { HeaderRight } from "./HeaderRight";

export function Header(Quiz: QuizDetail) {
    return (
        <div>
            <div className="flex justify-evenly">
                <HeaderLeft {...Quiz} />
                <HeaderRight {...Quiz} />
            </div>
            <HeaderBottom {...Quiz} />
        </div>
    );
}
