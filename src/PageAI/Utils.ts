export interface InputAI {
    Text: string;
    NumberOfQuestion: number;
    DifficultLevel: string;
    Language: string;
    Type: string;
    Output: QuestionAI[] | null;
}

export interface AnswerAI {
    Answer: string;
    IsCorrect: boolean;
}
export interface QuestionAI {
    Question: string;
    Answers: AnswerAI[];
    Explanation: string;
}

export interface AIProps {
    state: InputAI;
    setState: React.Dispatch<React.SetStateAction<InputAI>>;
}
