import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { BodyQuestionNoImage } from "./BodyQuestionNoImage";
import { BodyQuestion } from "./BodyQuestion";

export function Body(Quiz: QuizDetail) {
    return (
        <div className="flex-grow justify-between flex flex-col mt-2 gap-4">
            {Quiz.Questions.map((Question, Idx) => {
                if (Question.ImageUrl? true : false) {
                    return (
                        <div key={Idx}>
                            <BodyQuestion Question={Question} Idx={Idx} />
                        </div>
                    );
                }
                return (
                    <div key={Idx}>
                        <BodyQuestionNoImage Question={Question} Idx={Idx} />
                    </div>
                );
            })}
        </div>
    );
}
