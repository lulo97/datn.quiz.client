import { QuestionDetail } from "@/PageCreateQuestion/Utils";
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
    MaxPage: number;
    quiz?: QuizDetail;
    questions?: QuestionDetail[];
}

export interface ExamPdfProps {
    quiz: QuizDetail | undefined;
    setQuiz: React.Dispatch<React.SetStateAction<QuizDetail | undefined>>;
    pagesRef: React.MutableRefObject<HTMLDivElement[]>;
}
