import { DifficultLevel, Language, Type } from "@/InterfacesDatabase";

export interface InputAI {
    Text: string;
    NumberOfQuestion: number;
    DifficultLevel: DifficultLevel | null;
    Language: Language | null;
    Type: Type | null;
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

export function getErrors(state: InputAI) {
    const errors = [];
    if (state.Text.length < 30) {
        errors.push("Độ dài đoạn văn phải hơn 30 chữ!");
    }
    if (!state.NumberOfQuestion) {
        errors.push("Hãy số lượng câu hỏi!");
    }
    if (!state.DifficultLevel) {
        errors.push("Hãy chọn độ khó câu hỏi!");
    }
    if (!state.Language) {
        errors.push("Hãy chọn ngôn ngữ!");
    }
    if (!state.Type) {
        errors.push("Hãy chọn loại trắc nghiệm!");
    }
    return errors;
}
