import { MCQ, SCQ, SORT } from "@/Utils";
import { Revise, Action, ActionType } from "./Utils";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QuizDetail } from "@/PageRoomMonitor/Utils";

function getCorrectPercent(q: QuestionDetail) {
    if (q.CorrectUserCount + q.IncorrectUserCount == 0) return 0;
    return q.CorrectUserCount / (q.CorrectUserCount + q.IncorrectUserCount);
}

function compareCorrectPercert(
    q1: QuestionDetail,
    q2: QuestionDetail,
    sort: string
) {
    const percent1 = getCorrectPercent(q1);
    const percent2 = getCorrectPercent(q2);
    if (sort === SORT.REVISE_EASY) return percent1 - percent2;
    return percent2 - percent1;
}

export function reducer(state: Revise, action: Action): Revise {
    switch (action.type) {
        case ActionType.ChangeQuestionIdx: {
            const QuestionIdx = action.payload;
            return { ...state, QuestionIdx: QuestionIdx };
        }
        case ActionType.Initial: {
            const { Quiz, Sort, QuestionNum }: { Quiz: QuizDetail; Sort: string, QuestionNum: number } =
                action.payload;

            if (Sort == SORT.REVISE_DEFAULT) return state;
            const SortedQuestions = Quiz.Questions.sort((a, b) =>
                compareCorrectPercert(a, b, Sort)
            );
            const QuizSortedQuestions = { ...Quiz, Questions: SortedQuestions };

            const QuestionSlice = QuizSortedQuestions.Questions.slice(0, QuestionNum);
            const QuizSortedQuestionsSlice = { ...QuizSortedQuestions, Questions: QuestionSlice };

            const Response = QuizSortedQuestionsSlice.Questions.map((ele) => ({
                QuestionId: ele.QuestionId,
                SelectedAnswers: [],
                ShowExplanation: false,
            }));
            return { ...state, Quiz: QuizSortedQuestionsSlice, Response: Response };
        }

        case ActionType.ChangeSelectedAnswer: {
            const AnswerId = action.payload;
            const Question = state.Quiz?.Questions[state.QuestionIdx];

            if (!Question) return state;

            const SelectedAnswers =
                state.Response[state.QuestionIdx].SelectedAnswers;
            let _SelectedAnswers = [...SelectedAnswers, AnswerId];

            const isSCQ = Question.Type?.Name === SCQ;
            const isMCQ = Question.Type?.Name === MCQ;

            if (isSCQ && SelectedAnswers.length > 0) {
                _SelectedAnswers = [AnswerId];
            } else if (isMCQ && SelectedAnswers.includes(AnswerId)) {
                _SelectedAnswers = _SelectedAnswers.filter(
                    (id) => id !== AnswerId
                );
            }

            const _Response = state.Response.map((response) => {
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
                    return { ...ele, ShowExplanation: !ele.ShowExplanation };
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
