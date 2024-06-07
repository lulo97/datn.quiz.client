import { MCQ, SCQ } from "@/Utils";
import { Revise, Action, ActionType } from "./Utils";

export function reducer(state: Revise, action: Action): Revise {
    switch (action.type) {
        case ActionType.ChangeQuestionIdx: {
            const QuestionIdx = action.payload;
            return { ...state, QuestionIdx: QuestionIdx };
        }
        case ActionType.ChangeQuiz: {
            const Quiz = action.payload;
            return { ...state, Quiz: Quiz };
        }
        case ActionType.ChangeResponse: {
            const Response = state.Quiz?.Questions.map((ele) => ({
                QuestionId: ele.QuestionId,
                SelectedAnswers: [],
                ShowExplaination: false,
            }));
            if (Response) {
                return { ...state, Response: Response };
            }
            return state;
        }

        case ActionType.ChangeSelectedAnswer: {
            const AnswerId = action.payload;
            const Question = state.Quiz?.Questions[state.QuestionIdx];
        
            if (!Question) return state;
        
            const SelectedAnswers = state.Response[state.QuestionIdx].SelectedAnswers;
            let _SelectedAnswers = [...SelectedAnswers, AnswerId];
        
            const isSCQ = Question.Type?.Name === SCQ;
            const isMCQ = Question.Type?.Name === MCQ;
        
            if (isSCQ && SelectedAnswers.length > 0) {
                _SelectedAnswers = [AnswerId];
            } else if (isMCQ && SelectedAnswers.includes(AnswerId)) {
                _SelectedAnswers = _SelectedAnswers.filter(id => id !== AnswerId);
            }
        
            const _Response = state.Response.map(response => {
                if (response.QuestionId === Question.QuestionId) {
                    return { ...response, SelectedAnswers: _SelectedAnswers };
                }
                return response;
            });
        
            return { ...state, Response: _Response };
        }
        
        case ActionType.ChangeExplain: {
            const Question = state.Quiz?.Questions[state.QuestionIdx];
            if (!Question) return state;
            let Response = state.Response.map((ele) => {
                if (ele.QuestionId == Question.QuestionId) {
                    return { ...ele, ShowExplaination: !ele.ShowExplaination };
                }
                return ele;
            });
            return { ...state, Response: Response };
        }
        default: {
            return state;
        }
    }
}
