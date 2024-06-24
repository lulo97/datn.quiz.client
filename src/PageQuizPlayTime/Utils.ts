import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { getUUID } from "@/Utils";
import { isEqual } from "lodash";
import { ActionLS, getDataFromStorage } from "./ReducerLocalStorage";
import { User } from "@/InterfacesDatabase";

export interface UserResponse {
    QuestionId: string;
    SelectedAnswers: string[];
}

export interface LocalPlayData {
    QuestionIdx: 0;
    Response: UserResponse[];
    StartTime: number;
    EndTime: number;
    CurrentTime: number;
    RoomId: null;
    User: User | null;
}

export interface PlayTimeProps {
    state: QuizDetail;
    localPlay: LocalPlayData;
    dispatchLS: (state: QuizDetail, action: ActionLS) => void;
}

export function getInitialState(): LocalPlayData {
    return {
        QuestionIdx: 0,
        Response: [],
        StartTime: 0,
        EndTime: 0,
        CurrentTime: 0,
        RoomId: null,
        User: null,
    };
}

export const LocalPlayingKey = "LocalPlaying";
export const LocalAfterPlayKey = "LocalAfterPlayKey";

export function getSelectedQuestions(
    Quiz: QuizDetail,
    Response: UserResponse[]
) {
    const Questions = Quiz.Questions;
    const _Question = Questions.map((q, i) => {
        const _Answers = q.Answers.filter((a) => {
            if (Response[i].SelectedAnswers.includes(a.AnswerId)) return true;
            return false;
        });
        return { ...q, Answers: _Answers };
    });
    return _Question;
}

function getCorrectAnswersQuestions(Quiz: QuizDetail) {
    const Questions = Quiz.Questions;
    const _Question = Questions.map((q, i) => {
        const _Answers = q.Answers.filter((a) => {
            if (a.IsCorrect) return true;
            return false;
        });
        return { ...q, Answers: _Answers };
    });
    return _Question;
}

export function caculateScore(
    Quiz: QuizDetail,
    UserResponse: QuestionDetail[]
) {
    //CorrectAnswersQuestions = CAQ
    const CAQ = getCorrectAnswersQuestions(Quiz);
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

export function getRecords(Quiz: QuizDetail, UserId: string) {
    const localPlay = getDataFromStorage();
    if (!localPlay) return;
    const PlayId = getUUID();
    const Response = localPlay.Response;
    const UserResponseDetail = getSelectedQuestions(Quiz, Response);
    const Score = caculateScore(Quiz, UserResponseDetail);
    const PlayRecordInsert = {
        PlayId: PlayId,
        UserId: UserId,
        QuizId: Quiz.QuizId,
        RoomId: null,
        StartTime: localPlay.StartTime,
        SubmitTime: localPlay.CurrentTime,
        Score: Score,
    };
    const SelectedAnswersInsert = Response.map((ele) => ele.SelectedAnswers)
        .flat()
        .map((ele) => ({
            AnswerId: ele,
            PlayId: PlayId,
        }));
    return {
        PlayRecordInsert: PlayRecordInsert,
        SelectedAnswersInsert: SelectedAnswersInsert,
    };
}
