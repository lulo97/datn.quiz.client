import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { QuizCardCollection } from "@/PageHomepage/Content/QuizCardCollection";

export function Footer(Quiz: QuizDetail) {
    return (
        <div className="flex flex-col gap-5 w-full">
            <QuizCardCollection label="Các đề liên quan" />
            <div>Comment</div>
        </div>
    );
}
