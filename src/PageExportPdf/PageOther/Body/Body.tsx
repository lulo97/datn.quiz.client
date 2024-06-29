import { BodyQuestionNoImage } from "./BodyQuestionNoImage";
import { BodyQuestion } from "./BodyQuestion";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";

export function Body(props: { questions: QuestionDetail[] }) {
    const { questions } = props;
    const JustifyClass =
        questions.length == 6 ? "justify-between" : "justify-start";
    return (
        <div className={`flex-grow ${JustifyClass} flex flex-col mt-2 gap-4`}>
            {questions.map((Question, Idx) => {
                if (Question.ImageUrl ? true : false) {
                    return (
                        <div key={Idx}>
                            <BodyQuestion Question={Question} Idx={Idx + 6} />
                        </div>
                    );
                }
                return (
                    <div key={Idx}>
                        <BodyQuestionNoImage
                            Question={Question}
                            Idx={Idx + 6}
                        />
                    </div>
                );
            })}
        </div>
    );
}
