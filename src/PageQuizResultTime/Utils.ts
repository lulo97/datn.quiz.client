import { Play, SelectedAnswer } from "@/InterfacesDatabase";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { getQuestionsWithSelectedAnswers } from "@/components/question_card/Utils";
import { isEqual } from "lodash";

export interface PlayDetail extends Play {
    Quiz: QuizDetail;
    SelectedAnswers: SelectedAnswer[];
}

export function getTotalCorrectCount(data: PlayDetail) {
    const QuestionsWithSelectedAnswers = getQuestionsWithSelectedAnswers(data);
    let count = 0;
    QuestionsWithSelectedAnswers.forEach((ele) => {
        const CorrectAnswers = ele.Answers.filter(
            (ele) => ele.IsCorrect == true
        );
        if (
            isEqual(
                ele.SelectedAnswers,
                CorrectAnswers.map((ele) => ele.AnswerId)
            )
        )
            count += 1;
    });
    return count;
}
