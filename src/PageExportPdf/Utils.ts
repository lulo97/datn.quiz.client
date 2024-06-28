import { QuizDetail } from "@/PageCreateQuiz/Utils";

export const AnswerPrefix = [
    "a) ",
    "b) ",
    "c) ",
    "d) ",
    "e) ",
    "f) ",
    "g) ",
    "h) ",
];

export interface PageProps {
    PageIdx: number;
    Quiz: QuizDetail;
    FirstPage: boolean;
    MaxPage: number;
}

export function createSubQuizzes(
    props: QuizDetailProps,
    chunkSize: number
): QuizDetail[] {
    let subQuizzes = [];
    for (let i = 0; i < quiz.Questions.length; i += chunkSize) {
        let subQuiz = {
            ...quiz,
            Questions: quiz.Questions.slice(i, i + chunkSize),
        };
        subQuizzes.push(subQuiz);
    }
    return subQuizzes;
}

export interface ExamPdfProps {
    Quizs: QuizDetail[] | null;
    handleDownload: () => Promise<void>;
    componentRefs: React.MutableRefObject<HTMLDivElement[]>;
    fetchData: (Quiz: QuizDetail) => Promise<void>;
}
