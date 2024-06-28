import {
    Play,
    Room,
    SelectedAnswer,
    User,
    UserInRoom,
} from "@/InterfacesDatabase";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

interface PlayWithSelectedAnswer extends Play {
    SelectedAnswers: SelectedAnswer[];
}

interface UserInRoomWhenUser extends Omit<UserInRoom, "UserId"> {
    User: User;
}

export interface Ranking {
    Room: Room;
    Quiz: QuizDetail;
    UsersInRooms: UserInRoomWhenUser[];
    Plays: PlayWithSelectedAnswer[];
}

export function getScore(
    Questions: QuestionDetail[],
    SelectedAnswers: SelectedAnswer[]
) {
    const FlatSA = SelectedAnswers.map((ele) => ele.AnswerId);
    const TempNewAS = [];
    for (let i = 0; i < Questions.length; i++) {
        const q = Questions[i];
        const as = q.Answers;
        const new_as = as.map((ele) => ({
            ...ele,
            Selected: FlatSA.includes(ele.AnswerId),
        }));
        TempNewAS.push(new_as);
    }
    let score = 0;
    TempNewAS.forEach((new_as, idx) => {
        let IsGotScore = true;
        new_as.forEach((ele) => {
            if (ele.IsCorrect != ele.Selected) {
                IsGotScore = false;
            }
        });
        if (IsGotScore) {
            score += Questions[idx].Point?.Value || 0;
        } else {
            if (Questions[idx].PenaltyAllow) {
                score -= Questions[idx].PenaltyPoint?.Value || 0;
            }
        }
    });
    return score;
}

export function getTotalQuestionCorrect(
    Questions: QuestionDetail[],
    SelectedAnswers: SelectedAnswer[]
) {
    const FlatSA = SelectedAnswers.map((ele) => ele.AnswerId);
    const TempNewAS = [];
    for (let i = 0; i < Questions.length; i++) {
        const q = Questions[i];
        const as = q.Answers;
        const new_as = as.map((ele) => ({
            ...ele,
            Selected: FlatSA.includes(ele.AnswerId),
        }));
        TempNewAS.push(new_as);
    }
    let count = 0;
    TempNewAS.forEach((new_as) => {
        let IsGotScore = true;
        new_as.forEach((ele) => {
            if (ele.IsCorrect != ele.Selected) {
                IsGotScore = false;
            }
        });
        if (IsGotScore) {
            count += 1;
        }
    });
    return count;
}

export function getDataForContent(rankData: Ranking) {
    const data = rankData.UsersInRooms.map((uir) => {
        const SelectedAnswers = rankData.Plays.find(
            (play) => play.UserId == uir.User.UserId
        )?.SelectedAnswers;
        const startTime = new Date(uir.StartTime);
        const endTime = new Date(uir.EndTime);
        const TimeTaken = (endTime.getTime() - startTime.getTime()) / 1000;
        if (SelectedAnswers) {
            return {
                Username: uir.User.Fullname,
                ImageUrl: uir.User.ImageUrl,
                Score: getScore(rankData.Quiz.Questions, SelectedAnswers),
                TimeTaken: TimeTaken,
                TotalCorrectAnswer: getTotalQuestionCorrect(
                    rankData.Quiz.Questions,
                    SelectedAnswers
                ),
            };
        }
    });
    return data;
}
