import { QuizDetail } from "@/PageCreateQuiz/Utils";

export enum Sort {
    EASY,
    HARD,
}

export enum ActionType {
    ChangeQuiz,
    ChangeQuestionIdx,
    ChangeSelectedAnswer,
    ChangeExplain,
    ChangeResponse
}

export interface Action {
    type: ActionType;
    payload: any;
}



export interface Revise {
    Quiz: QuizDetail | null;
    QuestionIdx: 0;
    Response: {
        QuestionId: string,
        SelectedAnswers: string[],
        ShowExplaination: boolean
    }[]
}

export interface ReviseProps {
    state: Revise;
    dispatch: React.Dispatch<Action>;
}

export function getInitialState(): Revise {
    return {
        Quiz: null,
        QuestionIdx: 0,
        Response: []
    }
}
