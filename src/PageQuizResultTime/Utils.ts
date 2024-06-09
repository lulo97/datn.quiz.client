import { Play, SelectedAnswer } from "@/InterfacesDatabase";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { isEqual } from "lodash";

export interface PlayDetail extends Play {
    Quiz: QuizDetail;
    SelectedAnswers: SelectedAnswer[];
}

export interface IQWSA extends QuestionDetail {
    SelectedAnswers: string[]
}

//QWSA = Questions With Selected Answers
export function getQWSA(data: PlayDetail): IQWSA[] {
    const questions: QuestionDetail[] = data.Quiz.Questions;
    const selectedAnswers: SelectedAnswer[] = data.SelectedAnswers;
    const selectedAnswerMap: { [key: string]: boolean } =
        selectedAnswers.reduce((acc: { [key: string]: boolean }, sa) => {
            acc[sa.AnswerId] = true;
            return acc;
        }, {});

    return questions.map((question) => {
        const selectedAnswers = question.Answers.filter(
            (answer) => selectedAnswerMap[answer.AnswerId]
        ).map((answer) => answer.AnswerId);

        return {
            ...question,
            SelectedAnswers: selectedAnswers,
        };
    });
}

export function getTotalCorrectCount(data: PlayDetail) {
    const QWSA = getQWSA(data);
    let count = 0;
    QWSA.forEach((ele) => {
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
