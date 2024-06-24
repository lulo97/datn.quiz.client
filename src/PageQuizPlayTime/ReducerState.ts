import { SORT, shuffle } from "@/Utils";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

export enum ActionTypeState {
    SetQuiz,
}

export interface ActionState {
    type: ActionTypeState;
    payload: any;
}

export function reducerState(
    state: QuizDetail,
    action: ActionState
): QuizDetail {
    switch (action.type) {
        case ActionTypeState.SetQuiz: {
            const {sort, quiz_detail} = action.payload;
            if (sort === SORT.TIME_DEFAULT) return quiz_detail;

            let sortedQuestions: QuestionDetail[] = quiz_detail.Questions;
            if (sort === SORT.TIME_QUESTION) {
                sortedQuestions = shuffle(sortedQuestions);
            }
            if (sort === SORT.TIME_QA) {
                sortedQuestions = sortedQuestions.map((question) => ({
                    ...question,
                    Answers: shuffle(question.Answers),
                }));
            }

            return { ...quiz_detail, Questions: sortedQuestions };
        }
        default: {
            return state;
        }
    }
}
