import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Body } from "./Body/Body";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

export function AnswerPdf(Quiz: QuizDetail) {
    return (
        <div
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            className="flex flex-col px-5 py-4 w-[21cm] h-[29.7cm] bg-white text-[12]"
        >
            <Header {...Quiz} />
            <Body {...Quiz} />
            <Footer />
        </div>
    );
}