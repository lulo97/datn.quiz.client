import { MCQ, SCQ, SORT, nowSecond, shuffle } from "@/Utils";
import { Action, ActionType, LocalPlaying, PlayTime } from "./Utils";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";

// Function to update local storage
function updateLocalStorage(data: PlayTime) {
    localStorage.clear()
    localStorage.removeItem(LocalPlaying);
    localStorage.setItem(LocalPlaying, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
}

export function reducer(state: PlayTime, action: Action): PlayTime {
    switch (action.type) {
        case ActionType.ChangeQuiz: {
            const quiz = action.payload;
            const startTime = nowSecond();
            const endTime = startTime + quiz.Time.Value * 60;

            const newState: PlayTime = {
                ...state,
                Quiz: quiz,
                StartTime: startTime,
                CurrentTime: startTime,
                EndTime: endTime,
            };

            if (!localStorage.getItem(LocalPlaying)) {
                updateLocalStorage(newState);
            }

            return state;
        }
        case ActionType.InitialResponse: {
            const storedData = localStorage.getItem(LocalPlaying);

            if (storedData) {
                const localPlaying: PlayTime = JSON.parse(storedData);

                if (localPlaying) {
                    const Response = localPlaying.Quiz.Questions.map(
                        (question) => ({
                            QuestionId: question.QuestionId,
                            SelectedAnswers: [],
                            ShowExplaination: false,
                        })
                    );

                    const newState = {
                        ...localPlaying,
                        Response: Response,
                    };

                    updateLocalStorage(newState);
                }
            }

            return state;
        }
        case ActionType.ChangeQuestionIdx: {
            const questionIdx = action.payload;
            const storedData = localStorage.getItem(LocalPlaying);

            if (storedData) {
                const localPlaying: PlayTime = JSON.parse(storedData);

                if (localPlaying) {
                    const newState = {
                        ...localPlaying,
                        QuestionIdx: questionIdx,
                    };

                    updateLocalStorage(newState);
                }
            }

            return state;
        }
        case ActionType.Sort: {
            const sort = action.payload;
            if (sort === SORT.TIME_DEFAULT) return state;

            const storedData = localStorage.getItem(LocalPlaying);

            if (storedData) {
                const localPlaying: PlayTime = JSON.parse(storedData);

                if (localPlaying) {
                    let updatedQuestions: QuestionDetail[] =
                        localPlaying.Quiz.Questions;

                    if (sort === SORT.TIME_QUESTION || sort === SORT.TIME_QA) {
                        updatedQuestions = shuffle(updatedQuestions);

                        if (sort === SORT.TIME_QA) {
                            updatedQuestions = updatedQuestions.map(
                                (question) => ({
                                    ...question,
                                    Answers: shuffle(question.Answers),
                                })
                            );
                        }
                    }

                    const updatedQuiz = {
                        ...localPlaying.Quiz,
                        Questions: updatedQuestions,
                    };
                    const newState = { ...localPlaying, Quiz: updatedQuiz };

                    updateLocalStorage(newState);
                }
            }
            return state;
        }
        case ActionType.ChangeCurrentTime: {
            const currentTime = action.payload;
            const storedData = localStorage.getItem(LocalPlaying);

            if (storedData) {
                const localPlaying: PlayTime = JSON.parse(storedData);

                if (localPlaying) {
                    const updatedData = {
                        ...localPlaying,
                        CurrentTime: currentTime,
                    };

                    updateLocalStorage(updatedData);
                }
            }

            return state;
        }
        case ActionType.ChangeSelectedAnswer: {
            const AnswerId = action.payload;

            const storedData = localStorage.getItem(LocalPlaying);

            if (storedData) {
                const localPlaying: PlayTime = JSON.parse(storedData);

                if (localPlaying) {
                    const Question =
                        localPlaying.Quiz.Questions[localPlaying.QuestionIdx];

                    if (!Question) return state;

                    const SelectedAnswers =
                        localPlaying.Response[localPlaying.QuestionIdx]
                            .SelectedAnswers;
                    let _SelectedAnswers: string[] = [
                        ...SelectedAnswers,
                        AnswerId,
                    ];

                    const isSCQ = Question.Type?.Name === SCQ;
                    const isMCQ = Question.Type?.Name === MCQ;

                    if (isSCQ && SelectedAnswers.length > 0) {
                        _SelectedAnswers = [AnswerId];
                    }
                    if (isMCQ && SelectedAnswers.includes(AnswerId)) {
                        _SelectedAnswers = _SelectedAnswers.filter(
                            (id) => id !== AnswerId
                        );
                    }

                    const Response = localPlaying.Response.map((response) => {
                        if (response.QuestionId === Question.QuestionId) {
                            return {
                                ...response,
                                SelectedAnswers: _SelectedAnswers,
                            };
                        }
                        return response;
                    });

                    const updatedData = {
                        ...localPlaying,
                        Response: Response,
                    };

                    updateLocalStorage(updatedData);
                }
            }
            return state;
        }
        default: {
            return state;
        }
    }
}
