import { Body } from "./Body";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { HeaderTop } from "./HeaderTop";
import { HeaderBottom } from "./HeaderBottom";

export function PageAnswer(quiz: QuizDetail) {
    return (
        <div
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            className="flex flex-col px-5 py-4 w-[21cm] h-[29.7cm] bg-white text-[12]"
        >
            <HeaderTop {...quiz} />
            <HeaderBottom {...quiz} />
            <Body {...quiz} />
        </div>
    );
}
