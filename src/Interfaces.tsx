export interface Answer {
    id: string;
    content: string;
    correct: boolean
}

export interface AnswerManipulation {
    deleteAnswer: (id: string) => void;
    updateAnswerContent: (id: string, new_content: string) => void;
    updateAnswerCorrect: (id: string) => void;
}

export interface AnswerProps extends AnswerManipulation {
    answer: Answer;
}

export interface CreateQuestionData extends AnswerManipulation {
    answers: Answer[];
    setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
    addAnswer: () => void;
    question: string;
    setQuestion: React.Dispatch<React.SetStateAction<string>>;
}

export type QuestionTableDataType = {
    STT: number;
    Content: string;
    Type: string;
    Difficult: string;
    Subject: string;
    SubSubject: string;
    EducationLevel: string;
};

import { Table as TanstackTable } from "@tanstack/react-table";

export type QuestionTableProps = TanstackTable<QuestionTableDataType>;

