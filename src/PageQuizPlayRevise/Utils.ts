import { QuizDetail } from "@/PageRoomMonitor/Utils";

export enum ActionType {
    QuestionNumber,
    ChangeQuestionIdx,
    ChangeSelectedAnswer,
    ChangeExplain,
    Initial
}

export interface Action {
    type: ActionType;
    payload: any;
}

export interface Revise {
    Quiz: QuizDetail | null;
    QuestionIdx: 0;
    Response: {
        QuestionId: string;
        SelectedAnswers: string[];
        ShowExplanation: boolean;
    }[];
}

export interface ReviseProps {
    state: Revise;
    dispatch: React.Dispatch<Action>;
}

export function getInitialState(): Revise {
    return {
        Quiz: null,
        QuestionIdx: 0,
        Response: [],
    };
}
