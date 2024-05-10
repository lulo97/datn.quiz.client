import { CreateQuestionData } from "@/Interfaces";
import { Answer } from "./Answer";

export function Content(props: CreateQuestionData) {
    const { answers, deleteAnswer, updateAnswerContent, updateAnswerCorrect } =
        props;

    return (
        <div className="flex flex-col gap-1">
            {answers.map((ele) => (
                <Answer
                    key={ele.id}
                    answer={ele}
                    deleteAnswer={deleteAnswer}
                    updateAnswerContent={updateAnswerContent}
                    updateAnswerCorrect={updateAnswerCorrect}
                />
            ))}
        </div>
    );
}
