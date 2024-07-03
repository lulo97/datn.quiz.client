import { SelectedAnswer } from "@/InterfacesDatabase";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { PlayDetail } from "@/PageQuizResultTime/Utils";

export interface IQuestionsWithSelectedAnswers extends QuestionDetail {
    SelectedAnswers: string[];
}

//QuestionsWithSelectedAnswers = Questions With Selected Answers
export function getQuestionsWithSelectedAnswers(
    data: PlayDetail
): IQuestionsWithSelectedAnswers[] {
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
