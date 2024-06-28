import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { LocalPlayingKey, LocalPlayData } from "./Utils";
import { MCQ, SCQ, nowSecond } from "@/Utils";

// Function to update local storage
function updateDataLocalStorage(data: LocalPlayData) {
    localStorage.setItem(LocalPlayingKey, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
}

export function getDataFromStorage(): LocalPlayData | null {
    const storedData = localStorage.getItem(LocalPlayingKey);
    if (!storedData) return null;
    return JSON.parse(storedData) as LocalPlayData;
}

export interface ActionLS {
    type: ActionTypeLS;
    payload: any;
}

export enum ActionTypeLS {
    SetData,
    ChangeTime,
    ChangeQuestionIdx,
    ChangeSelectedAnswer,
}

export function dispatchLS(state: QuizDetail, action: ActionLS) {
    switch (action.type) {
        //Initialize localstorage, run after get Quiz
        case ActionTypeLS.SetData: {
            const { RoomId, User } = action.payload;
            const localPlay = getDataFromStorage();
            //Already have data so don't have to set initialize
            if (localPlay) return;

            const Response = state.Questions.map((question) => ({
                QuestionId: question.QuestionId,
                SelectedAnswers: [],
                ShowExplanation: false,
            }));

            const startTime = nowSecond();
            const quizTime = state.Time?.Value ? state.Time.Value * 60 : 0;
            const endTime = startTime + quizTime;

            updateDataLocalStorage({
                Response: Response,
                QuestionIdx: 0,
                StartTime: startTime,
                CurrentTime: startTime,
                EndTime: endTime,
                RoomId: RoomId,
                User: User,
            });

            return;
        }
        //Change current time localstorage
        case ActionTypeLS.ChangeTime: {
            const localPlay = getDataFromStorage();
            if (!localPlay) return;

            const currentTime = action.payload;
            updateDataLocalStorage({
                ...localPlay,
                CurrentTime: currentTime,
            });
            return;
        }
        //Change question idx based on user input
        case ActionTypeLS.ChangeQuestionIdx: {
            const localPlay = getDataFromStorage();
            if (!localPlay) return;

            const questionIdx = action.payload;
            updateDataLocalStorage({
                ...localPlay,
                QuestionIdx: questionIdx,
            });
            return;
        }
        //Change question idx based on user input
        case ActionTypeLS.ChangeSelectedAnswer: {
            const localPlay = getDataFromStorage();
            if (!localPlay) return;

            const AnswerId = action.payload;
            const CurrentQuestion = state.Questions[localPlay.QuestionIdx];
            const SelectedAnswers =
                localPlay.Response[localPlay.QuestionIdx].SelectedAnswers;
            let _SelectedAnswers: string[] = [...SelectedAnswers, AnswerId];
            const isSCQ = CurrentQuestion.Type?.Name === SCQ;
            const isMCQ = CurrentQuestion.Type?.Name === MCQ;

            if (isSCQ && SelectedAnswers.length > 0) {
                _SelectedAnswers = [AnswerId];
            }
            if (isMCQ && SelectedAnswers.includes(AnswerId)) {
                _SelectedAnswers = _SelectedAnswers.filter(
                    (id) => id !== AnswerId
                );
            }

            const Response = localPlay.Response.map((response) => {
                if (response.QuestionId === CurrentQuestion.QuestionId) {
                    return {
                        ...response,
                        SelectedAnswers: _SelectedAnswers,
                    };
                }
                return response;
            });
            updateDataLocalStorage({
                ...localPlay,
                Response: Response,
            });
        }
    }
}
