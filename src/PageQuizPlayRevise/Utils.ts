import { QuizDetail, getInitalState } from "@/PageCreateQuiz/Utils";

export enum ActionType {
    ChangeQuiz,
    Sort,
    QuestionNumber,
    ChangeQuestionIdx,
    ChangeSelectedAnswer,
    ChangeExplain,
    InitialResponse,
}

export interface Action {
    type: ActionType;
    payload: any;
}

export interface Revise {
    Quiz: QuizDetail;
    QuestionIdx: 0;
    Response: {
        QuestionId: string;
        SelectedAnswers: string[];
        ShowExplaination: boolean;
    }[];
}

export interface ReviseProps {
    state: Revise;
    dispatch: React.Dispatch<Action>;
}

export function getInitialState(): Revise {
    return {
        Quiz: getInitalState(),
        QuestionIdx: 0,
        Response: [],
    };
}
