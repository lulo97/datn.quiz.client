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
    QuestionIdx: number;
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
    const _Question = Questions.map((q, _i) => {
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

function compare(IsSelected: boolean, IsCorrect: boolean) {
    if (IsCorrect.toString() == "1") {
        if (IsSelected == true) return true;
    }
    if (IsCorrect.toString() == "0") {
        if (IsSelected == false) return true;
    }
    return false;
}

function getMetricUserCount(Quiz: QuizDetail, Response: UserResponse[]) {
    const Questions = Quiz.Questions;
    let MetricUserCount: any = [];
    Questions.map((q) => {
        const currentResponse = Response.find(
            (ele) => ele.QuestionId == q.QuestionId
        );
        if (!currentResponse) return q;
        const _Answers = q.Answers.map((a) => {
            const currentAnswer = {
                ...a,
                IsSelected: currentResponse.SelectedAnswers.includes(
                    a.AnswerId
                ),
            };
            return currentAnswer;
        });
        const allEqual = _Answers.every((item) =>
            compare(item.IsSelected, item.IsCorrect)
        );
        MetricUserCount.push({
            QuestionId: q.QuestionId,
            CorrectUserCount: allEqual == true ? 1 : 0,
            IncorrectUserCount: allEqual == false ? 1 : 0,
        });
    });
    return MetricUserCount;
}

export function getRecords(Quiz: QuizDetail, UserId: string) {
    const localPlay = getDataFromStorage();
    if (!localPlay) return;
    const PlayId = getUUID();
    const Response = localPlay.Response;
    const UserResponseDetail = getSelectedQuestions(Quiz, Response);
    const Score = caculateScore(Quiz, UserResponseDetail);
    const MetricUserCount = getMetricUserCount(Quiz, Response);
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
        MetricUserCount: MetricUserCount,
    };
}
