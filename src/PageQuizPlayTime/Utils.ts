import { Play } from "@/InterfacesDatabase";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import {
    QuizDetail,
    getInitalState as getInitalQuiz,
} from "@/PageCreateQuiz/Utils";
import { getUUID } from "@/Utils";
import { isEqual } from "lodash";

export enum ActionType {
    ChangeQuiz,
    InitialResponse,
    Sort,
    ChangeQuestionIdx,
    ChangeSelectedAnswer,
    ChangeCurrentTime,
}

export interface Action {
    type: ActionType;
    payload: any;
}

export interface UserResponse {
    QuestionId: string;
    SelectedAnswers: string[];
}

export interface PlayTime {
    Quiz: QuizDetail;
    QuestionIdx: 0;
    Response: UserResponse[];
    StartTime: number;
    EndTime: number;
    CurrentTime: number;
}

export interface PlayTimeProps {
    state: PlayTime;
    dispatch: React.Dispatch<Action>;
}

export function getInitialState(): PlayTime {
    return {
        Quiz: getInitalQuiz(),
        QuestionIdx: 0,
        Response: [],
        StartTime: 0,
        EndTime: 0,
        CurrentTime: 0,
    };
}

export const LocalPlaying = "LocalPlaying";
export const LocalAfterPlay = "LocalAfterPlay";

export function getSelectedQuestions(Response: UserResponse[]) {
    const storedData = localStorage.getItem(LocalPlaying);
    if (storedData != null) {
        const localPlaying: PlayTime = JSON.parse(storedData);
        const Questions = localPlaying.Quiz.Questions;
        const _Question = Questions.map((q, i) => {
            const _Answers = q.Answers.filter((a) => {
                if (Response[i].SelectedAnswers.includes(a.AnswerId))
                    return true;
                return false;
            });
            return { ...q, Answers: _Answers };
        });
        return _Question;
    }
}

function getCorrectAnswersQuestions() {
    const storedData = localStorage.getItem(LocalPlaying);
    if (storedData != null) {
        const localPlaying: PlayTime = JSON.parse(storedData);
        const Questions = localPlaying.Quiz.Questions;
        const _Question = Questions.map((q, i) => {
            const _Answers = q.Answers.filter((a) => {
                if (a.IsCorrect) return true;
                return false;
            });
            return { ...q, Answers: _Answers };
        });
        return _Question;
    }
}

export function caculateScore(UserResponse: QuestionDetail[]) {
    //CorrectAnswersQuestions = CAQ
    const CAQ = getCorrectAnswersQuestions();
    if (!CAQ) return -1;
    let Score = 0;
    for (let i = 0; i < UserResponse.length; i++) {
        if (UserResponse[i].Answers.length == 0) continue;
        if (isEqual(CAQ[i].Answers, UserResponse[i].Answers)) {
            const Point = CAQ[i].Point?.Value;
            if (Point) Score += Point;
        } else {
            const PenaltyPoint = CAQ[i].PenaltyPoint?.Value;
            if (PenaltyPoint) Score -= PenaltyPoint;
        }
    }
    return Score;
}

export function getRecords(UserId: string) {
    const storedData = localStorage.getItem(LocalPlaying);
    const PlayId = getUUID();
    if (storedData != null) {
        const localPlaying: PlayTime = JSON.parse(storedData);
        const Response = localPlaying.Response;
        const UserResponseDetail = getSelectedQuestions(Response);
        if (!UserResponseDetail) return;
        const Score = caculateScore(UserResponseDetail);
        const pr = {
            PlayId: PlayId,
            UserId: UserId,
            QuizId: localPlaying.Quiz.QuizId,
            RoomId: null,
            StartTime: localPlaying.StartTime,
            SubmitTime: localPlaying.CurrentTime,
            Score: Score,
        };
        const sa = Response.map((ele) => ele.SelectedAnswers)
            .flat()
            .map((ele) => ({
                AnswerId: ele,
                PlayId: PlayId,
            }));
        return { pr, sa };
    }
}