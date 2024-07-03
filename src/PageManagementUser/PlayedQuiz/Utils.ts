import { PlayDetail } from "@/PageQuizResultTime/Utils";

export function getTime(StateTime: number, SubmitTime: number) {
    const startTime = new Date(StateTime.toString());
    const submitTime = new Date(SubmitTime.toString());
    const differenceMs = submitTime.getTime() - startTime.getTime();
    return differenceMs / 1000;
}

export function getMaxScore(playdetail: PlayDetail) {
    let Score = 0;
    playdetail.Quiz.Questions.map((ele) => {
        Score += ele.Point ? ele.Point.Value : 0;
    });
    return Score;
}
